const encoder = new TextEncoder();

export function encode(str: string) {
  return encoder.encode(str + "\0");
}

export function cstr(str: string): Deno.PointerValue {
  return Deno.UnsafePointer.of(encode(str + "\0"));
}
