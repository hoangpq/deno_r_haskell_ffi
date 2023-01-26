import { cstr, jstr } from "./utils.ts";
import { SYMBOLS } from "./r_ffi.ts";

const decoder = new TextDecoder();
const p = Deno.run({ cmd: ["R", "RHOME"], stdout: "piped", stderr: "piped" });

// await its completion
await p.status();
Deno.env.set("R_HOME", decoder.decode(await p.output()).replace("\n", ""));

let R!: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"];

try {
  R = Deno.dlopen(
    new URL("../target/release/libr_binding.dylib", import.meta.url),
    SYMBOLS,
  ).symbols;
} catch (e) {
  console.log(e.message);
}

const ELT_SETTER: Record<string, any> = {
  "number": R.SET_INTEGER_ELT,
  "string": R.SET_STRING_ELT,
};

const SEXPTYPE: Record<string, number> = {
  "number": 13, /* integer vectors */
  "string": 16, /* string vectors */
};

export type RConvertible =
  | number
  | bigint
  | null
  | undefined
  | boolean
  | Sexp
  | string;

export class Sexp {
  constructor(public handle: Deno.PointerValue) {
  }

  static from<T extends RConvertible>(v: T): Sexp {
    switch (typeof v) {
      case "string":
        return new Sexp(
          R.Rf_mkCharLen(cstr(v), v.length) as Deno.PointerValue,
        );

      default:
        throw new TypeError(`Unsupported type: ${typeof v}`);
    }
  }
}

export function r_load(path: string) {
  R.r_load(cstr(path));
}

export function r_call(f: Sexp, arg: Sexp) {
  R.r_call(f, arg.handle);
}

export function c(...elems: any[]): Sexp {
  if (elems.length === 0) throw new Error("Empty list!");

  const valueType = typeof elems[0];
  const sexpType = SEXPTYPE[typeof elems[0]];

  const v_ = R.Rf_protect(R.Rf_allocVector(sexpType, elems.length));
  R.R_PreserveObject(v_);

  const setter = ELT_SETTER[valueType];

  for (let i = 0; i < elems.length; i++) {
    const v = elems[i];
    if (valueType === "string") {
      setter(v_, i, R.Rf_mkCharLen(cstr(v), v.length) as Deno.UnsafePointer);
    } else {
      setter(v_, i, v);
    }
  }
  return new Sexp(v_);
}

export function runR(handler: () => any) {
  R.r_init_vm();
  handler();
  R.r_release_vm();
}

export const ProxiedPyObject = Symbol("ProxiedPyObject");

class RValue {
  public handle: Deno.PointerValue;

  public constructor(handle: Deno.PointerValue) {
    this.handle = handle;
  }

  static from(handle: Deno.PointerValue): RValue {
    return new RValue(handle);
  }
}

export class RFunc extends RValue {
  public name: string;

  constructor(name: string) {
    super(R.r_function(cstr(name)));
    this.name = name;
  }

  get proxy(): any {
    const scope = this;

    function object(...args: any[]) {
      // return scope.call(args)?.proxy;
      return scope.call(args);
    }

    Object.defineProperty(object, Symbol.for("Deno.customInspect"), {
      value: () => this.toString(),
    });

    Object.defineProperty(object, Symbol.iterator, {
      value: () => this[Symbol.iterator](),
    });

    Object.defineProperty(object, ProxiedPyObject, {
      value: this,
      enumerable: false,
    });

    Object.defineProperty(object, "toString", {
      value: () => this.toString(),
    });

    Object.defineProperty(object, "valueOf", {
      value: () => this.valueOf(),
    });

    return new Proxy(object, {
      get: (_, name) => {
        console.log("get");
      },
      set: (_, name, value) => {
        console.log("set");
      },
      has: (_, name) => {
        console.log("has");
      },
    });
  }

  call(args: NamedArgument[]): Sexp {
    let f = R.r_named_arguments(args.length, this.handle);

    let call = f;
    for (const arg of args) {
      call = R.r_set_argument(cstr(arg.name), arg.value, call);
    }

    return new Sexp(R.r_call(f));
  }
}

export class NamedArgument {
  name: string;
  value: Sexp;

  public static of(name: string, value: number) {
    return new NamedArgument(name, value);
  }

  public static raw(name: string, value: Sexp) {
    return new NamedArgument(name, value);
  }

  constructor(name: string, value: number | Sexp) {
    this.name = name;
    this.value = typeof value === "number"
      ? R.Rf_ScalarInteger(value)
      : value.handle;
  }
}

export class RInstance {
  public static func(name: string): any {
    return new RFunc(name).proxy;
  }

  public static eval(expr: string): any {
    return R.r_eval(cstr(expr));
  }

  public static print(expr: Sexp) {
    R.r_print(expr.handle);
  }
}
