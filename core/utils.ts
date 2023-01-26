const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function encode(str: string) {
  return encoder.encode(str + "\0");
}

export function cstr(str: string): Deno.PointerValue {
  return Deno.UnsafePointer.of(encode(str + "\0"));
}

export function jstr(ptr: Deno.PointerValue): string {
  return decoder.decode(ptr);
}
