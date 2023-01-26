#include "binding.h"
#include "utils.h"

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

SEXP r_named_arguments(uint32_t argc, SEXP f) {
    SEXP call = PROTECT(Rf_allocVector(LANGSXP, argc + 1));
    SETCAR(call, f);
    return call;
}

SEXP r_set_argument(const char *key, SEXP value, SEXP call) {
    SEXP s = CDR(call);
    SETCAR(s, value);
    SET_TAG(s, Rf_install(key));
    return s;
}

/**
 * Invoke R function
 */
SEXP r_call(SEXP call) {
    PROTECT(call);

    // Execute the function
    int error_occurred;
    SEXP ret = R_tryEval(call, R_GlobalEnv, &error_occurred);

    /*if (Rf_isString(ret) == Rboolean::TRUE) {
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
    }*/

    return ret;
}

/**
 * Eval R expression
 */
SEXP r_eval(const char *expr_str) {
    SEXP result, tmp, e1, val_parse;
    int error_occured;

    // language construct
    PROTECT(e1 = allocVector(LANGSXP, 2));
    SETCAR(e1, Rf_install("parse"));
    SETCAR(CDR(e1), tmp = NEW_CHARACTER(1));
    SET_STRING_ELT(tmp, 0, COPY_TO_USER_STRING(expr_str));

    SEXP next = CDR(e1);
    SET_TAG(next, Rf_install("text"));

    PROTECT(val_parse = R_tryEval(e1, R_GlobalEnv, &error_occured));

    if (error_occured) {
        UNPROTECT(1);
        return R_NilValue;
    }

    SEXP e;
    PROTECT(e = allocVector(LANGSXP, 2));
    SETCAR(e, Rf_install("eval"));
    SETCAR(CDR(e), val_parse);
    // UNPROTECT(1);

    PROTECT(result = R_tryEval(e, R_GlobalEnv, &error_occured));
    // printf("%d\n", error_occured);

    if (error_occured) {
        UNPROTECT(2);
        return R_NilValue;
    }
    // UNPROTECT(2);
    return result;
}

void r_print(SEXP expr) {
    printSEXP(expr);
    /*SEXP e;
    PROTECT(e = lang2(r_function("print"), expr));
    R_tryEval(e, R_GlobalEnv, NULL);;*/
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
