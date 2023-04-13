dir=$(pwd)
cd core/utils && zig build
cd $dir
deno run -A --unstable playground/zig.ts
