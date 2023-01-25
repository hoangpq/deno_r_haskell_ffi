#include "binding.h"

/**
 * Create new R vector
 */
SEXP c(uint32_t len, int *val) {
    SEXP arg;

    PROTECT(arg = allocVector(INTSXP, len));
    memcpy(INTEGER(arg), val, len * sizeof(int));
    return arg;
}

/**
 * Load R function to environment
 */
void r_load(const char *name) {
    SEXP e;

    PROTECT(e = lang2(install("source"), mkString(name)));
    R_tryEval(e, R_GlobalEnv, NULL);
    UNPROTECT(1);
}

SEXP r_function(const char *name) {
    return Rf_install(name);
}

SEXP r_arguments(const char *name, uint32_t argc, ...) {
    va_list ptr;
    va_start(ptr, argc);
    SEXP sexps[argc];
    for (int i = 0; i < argc; i++) {
        sexps[i] = va_arg(ptr, SEXP);
    }
    va_end (ptr);

    SEXP func_;
    SEXP function_name = install(name);

    switch (argc) {
        case 0:
            PROTECT(func_ = lang1(function_name));
            break;
        case 1:
            PROTECT(func_ = lang2(function_name, sexps[0]));
            break;
        case 2:
            PROTECT(func_ = lang3(function_name, sexps[0], sexps[1]));
            break;
    }
    return func_;
}

SEXP named_arguments(uint32_t argc, SEXP f) {
    SEXP call = PROTECT(Rf_allocVector(LANGSXP, argc + 1));
    SETCAR(call, f);
    return call;
}

SEXP set_argument(const char *key, SEXP value, SEXP call) {
    SEXP s = CDR(call);
    SETCAR(s, value);
    SET_TAG(s, Rf_install(key));
    return s;
}

/**
 * Invoke R function
 */
SEXP r_call(SEXP call, SEXP args) {
    // Execute the function
    int errorOccurred;

    SEXP ret = R_tryEval(call, R_GlobalEnv, &errorOccurred);
    UNPROTECT(2);

    if (Rf_isString(ret) == Rboolean::TRUE) {
        SEXP *val2 = STRING_PTR(ret);
        for (int i = 0; i < LENGTH(ret); i++) {
            // printf("%s\n", RAW_OR_NULL(val2[i]));
        }
    } else {
        double *val = REAL(ret);
        // printf("%s\n", Rf_isReal(ret) == Rboolean::TRUE ? "true" : "false");

        for (int i = 0; i < LENGTH(ret); i++) {
            // printf("%d\n", (int) val[i]);
        }
    }

    UNPROTECT(2);
    return ret;
}

// Init R environment
void init_vm_r() {
    int r_argc = 2;
    char *r_argv[] = {"R", "--silent"};
    Rf_initEmbeddedR(r_argc, r_argv);
}

// Release R environment
void release_vm_r() {
    Rf_endEmbeddedR(0);
}
