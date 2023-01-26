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

const path = new URL("../libs/libEval", import.meta.url);
export const Haskell: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"] = Deno.dlopen(
  path,
  SYMBOLS,
).symbols;
