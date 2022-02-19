import __ from "https://deno.land/x/dirname@1.1.2/mod.ts";
import { cstr } from "./utils.ts";

export const SYMBOLS = {
  my_enter: {
    parameters: [],
    result: "void",
  },
  my_exit: {
    parameters: [],
    result: "void",
  },
  eval: {
    parameters: [
      "pointer",
      "pointer",
      "function",
    ],
    result: "pointer",
  },
  goroutine: {
    parameters: [
      "function",
    ],
    result: "void",
  },
  goroutine_async: {
    name: "goroutine",
    parameters: ["function"],
    result: "i32",
    nonblocking: true,
  },
  timer: {
    parameters: [
      "function",
      "i32",
    ],
    result: "void",
  },
  register_cb: {
    parameters: ["function"],
    result: "void",
  },
  array: {
    parameters: [],
    result: "pointer",
  },
} as const;

let Haskell!: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"];

try {
  const path = "../libs/libEval";

  Haskell = Deno.dlopen(
    path,
    SYMBOLS,
  ).symbols;

  type i32 = number;
  const cb = new Deno.UnsafeCallback(
    {
      parameters: ["i32"],
      result: "void",
    } as const,
    (val: i32) => {
      // console.log(val);
    },
  );

  const intValue = new Uint8Array(4);
  const _ptr = Deno.UnsafePointer.of(intValue);
  Haskell.eval(cstr("1 + 2 + 3"), _ptr, cb.pointer);
  const _view = new Deno.UnsafePointerView(_ptr);
  console.log("Value:", _view.getUint32(0));

  Deno.unrefTimer(setInterval(() => {
    console.log("Calling Haskell.goroutine_async");
  }, 500));

  await (async () => {
    console.time("callback");
    const cb = new Deno.UnsafeCallback(
      {
        parameters: ["i32"],
        result: "void",
      } as const,
      (val: i32) => {
        // console.log(val);
      },
    );
    const result = await Haskell.goroutine_async(cb.pointer);
    console.log(result);
    cb.close();
    console.timeEnd("callback");
  })();

  const ptr = Haskell.array();
  const view = new Deno.UnsafePointerView(ptr);
  const length = view.getUint32(0);

  let startIdx = 4;
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(view.getUint32(startIdx));
    startIdx += 4;
  }
  console.log(list);
} catch (e) {
  console.log(e.message);
}
