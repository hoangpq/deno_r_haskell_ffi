import { Haskell, cstr } from "../core/mod.ts";

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