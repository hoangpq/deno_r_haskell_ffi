use std::ffi::c_uint;
use r_sys::SEXP;
use std::os::raw::{c_char, c_void};

macro_rules! export {
    ($rename: ident, fn $name:ident($( $arg:ident : $type:ty ),*) -> $ret:ty) => {
        #[no_mangle]
        #[doc = "# Safety"]
        #[doc = ""]
        #[doc = "This function is unsafe for obvious reasons."]
        pub unsafe extern "C" fn $rename($( $arg : $type),*) -> $ret {
            r_sys::$name($( $arg ),*)
        }
    };
    ($rename: ident, fn $name:ident($( $arg:ident : $type:ty ),*)) => {
        export!($rename, fn $name($( $arg : $type),*) -> ());
    }
}

export!(r_init_vm, fn init_vm_r());
export!(r_release_vm, fn release_vm_r());
export!(r_load, fn r_load(module: *const c_char));
export!(r_call, fn r_call(f: SEXP, arg: SEXP) -> SEXP);
export!(r_c, fn c(len: u32, value: *const i32) -> SEXP);
export!(r_function, fn r_function(fname: *const c_char) -> SEXP);
export!(named_arguments, fn named_arguments(args: u32, f: SEXP) ->SEXP);
export!(set_argument, fn set_argument(name: *const c_char, value: SEXP, call: SEXP) -> SEXP);
