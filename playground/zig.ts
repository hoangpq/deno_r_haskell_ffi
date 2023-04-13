import { cstr, jstr } from "../core/utils.ts";
import { decoder } from "https://deno.land/x/python@0.2.2/src/util.ts";

export const SYMBOLS = {
  b64encode: {
    parameters: ["pointer", "usize", "pointer"],
    result: "void",
  },
} as const;

let Zig!: Deno.DynamicLibrary<typeof SYMBOLS>["symbols"];

function base64Encode(input: string) {
  const ptr = cstr(input);
  const r_ptr = cstr(' '.repeat(Math.round((input.length /3) * 4 )));
  Zig.b64encode(ptr, input.length, r_ptr);
  const _view = new Deno.UnsafePointerView(r_ptr);
  return _view.getCString();
}

try {
  Zig = Deno.dlopen(
    new URL("../core/utils/zig-out/lib/libutils.dylib", import.meta.url),
    SYMBOLS,
  ).symbols;

  console.log(base64Encode("Many hands make light work."));
} catch (e) {
  console.log(e.message);
}
