use std::ffi::{c_uint, c_void};
use std::os::raw::c_char;

#[allow(non_camel_case_types)]
pub type SEXP = *mut c_void;

extern "C" {
    pub fn init_vm_r();
    pub fn release_vm_r();
    pub fn r_load(module: *const c_char);
    pub fn r_call(f: SEXP, arg: SEXP) -> SEXP;
    pub fn c(len: u32, ptr: *const i32) -> SEXP;
    pub fn int_to_r(val: i32) -> SEXP;
    pub fn r_function(method: *const c_char) -> SEXP;
    pub fn named_arguments(args: u32, f: SEXP) -> SEXP;
    pub fn set_argument(name: *const c_char, value: SEXP, call: SEXP) -> SEXP;
}
