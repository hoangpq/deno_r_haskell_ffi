const std = @import("std");
const heap = std.heap;
const testing = std.testing;
const c_std = @cImport({
    @cInclude("stdlib.h");
});
const base64 = @import("base64.zig");

export fn b64encode(input: [*]const u8, len: usize, res: [*]u8) void {
    var p = @ptrCast([*]u8, res)[0..((len / 3) * 4)];
    _ = base64.encode(p, input[0..len]);
}

export fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "basic add functionality" {
    try testing.expect(add(3, 7) == 10);
}
