from cffi import FFI

ffi_builder = FFI()
ffi_builder.cdef("""
    typedef void (*callback)(int);
    extern int *eval(const char *, int *);
    extern void goroutine(callback cb);
    
    extern "Python" void my_callback(int);
""")

ffi_builder.set_source("_hs", "")
ffi_builder.compile(verbose=True)
