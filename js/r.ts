import __ from "https://deno.land/x/dirname@1.1.2/mod.ts";
import * as path from "https://deno.land/std@0.125.0/path/mod.ts";
import { cstr } from "./utils.ts";

const { __dirname } = __(import.meta);

import { SYMBOLS } from "./ffi.ts";

let R!: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"];

try {
  R = Deno.dlopen(
    path.join(__dirname, "..", "/target/debug/libr_binding.dylib"),
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

export function r_call(func: string, arg: Sexp) {
  R.r_call(cstr(func), arg.handle);
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

function readPointer(v: any): Uint8Array {
  const ptr = new Deno.UnsafePointerView(v);
  const lengthBe = new Uint8Array(4);
  const view = new DataView(lengthBe.buffer);
  ptr.copyInto(lengthBe, 0);

  console.log(view.getUint32(0));

  const buf = new Uint8Array(view.getUint32(0));
  ptr.copyInto(buf, 4);

  return buf;
}

const decoder = new TextDecoder();

export function runR(handler: () => any) {
  R.r_init_vm();

  const result = readPointer(R.test_serde());
  console.log(decoder.decode(result));

  handler();
  R.r_release_vm();
}
