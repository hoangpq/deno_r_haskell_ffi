# Haskell + R with Deno FFI (To learn Haskell + R internal)

```bash
# Enter nix-shell
$ nix-shell

# building shared library
$ chmod +x ./build-hs-dylib.sh
$ cargo build --release

# Haskell
$ deno run -A --unstable playground/haskell.ts

# R
$ deno run -A --unstable playground/r.ts

# Python
$ pip3 install cffi
$ python3 py_ffi/main.py
```
