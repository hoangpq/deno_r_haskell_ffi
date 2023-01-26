import asyncio
import time
from cffi import FFI

ffi = FFI()


@ffi.callback("void(int)")
def callback(x):
    print(x)


ffi.cdef("""
    extern int *eval(const char *, int *);
    typedef void (*callback)(int);
    extern int goroutine(callback cb);
""")


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)


async def nested(hs):
    hs.goroutine(callback)


async def main():
    hs = ffi.dlopen("libs/libEval")
    s = ffi.new("char[]", "1 + 2 + 3".encode('ascii'))
    r = ffi.new("int *")
    hs.eval(s, r)

    task1 = asyncio.create_task(nested(hs))

    task2 = asyncio.create_task(
        say_after(2, 'world'))

    start_time = time.time()

    # Wait until both tasks are completed (should take
    # around 2 seconds.)
    await task1
    await task2

    print(f"finished at {time.time() - start_time:.2f}s")


asyncio.run(main())
