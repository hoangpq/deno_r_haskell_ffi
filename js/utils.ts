const encoder = new TextEncoder();

export function cstr(str: string): Deno.PointerValue {
  return Deno.UnsafePointer.of(encoder.encode(str + "\0"));
}
