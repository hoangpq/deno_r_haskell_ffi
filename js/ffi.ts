export const SYMBOLS = {
  r_init_vm: {
    parameters: [],
    result: "void",
  },
  r_release_vm: {
    parameters: [],
    result: "void",
  },
  r_load: {
    parameters: ["pointer"],
    result: "void",
  },
  r_call: {
    parameters: ["pointer", "pointer"],
    result: "void",
  },
  r_c: {
    parameters: ["i32", "pointer"],
    result: "pointer",
  },
  Rf_ScalarInteger: {
    parameters: ["i32"],
    result: "pointer",
  },
  Rf_allocVector: {
    parameters: ["i32", "i32"],
    result: "pointer",
  },
  Rf_allocList: {
    parameters: ["i32"],
    result: "pointer",
  },
  R_PreserveObject: {
    parameters: ["pointer"],
    result: "pointer",
  },
  SET_VECTOR_ELT: {
    parameters: ["pointer", "i32", "pointer"],
    result: "pointer",
  },
  SET_INTEGER_ELT: {
    parameters: ["pointer", "i32", "i32"],
    result: "void",
  },
  SET_STRING_ELT: {
    parameters: ["pointer", "i32", "pointer"],
    result: "void",
  },
  Rf_protect: {
    parameters: ["pointer"],
    result: "pointer",
  },
  Rf_mkCharLen: {
    parameters: ["pointer", "u32"],
    result: "pointer",
  },
  R_NilValue: {
    name: "R_NilValue",
    type: "pointer",
  },
  r_function: {
    parameters: ["pointer"],
    result: "pointer",
  },
  named_arguments: {
    parameters: ["u32", "pointer"],
    result: "pointer",
  },
  set_argument: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "pointer",
  },
} as const;
