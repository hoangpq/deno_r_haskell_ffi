#ifndef BINDING_H
#define BINDING_H

#include <stdint.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include <Rinternals.h>
#include <Rembedded.h>
#include <Rdefines.h>

#ifndef R_API
#define R_API extern
#endif

#ifdef __cplusplus
extern "C" {
#endif

// VM
R_API void init_vm_r();
R_API void release_vm_r();

R_API SEXP c(uint32_t, int *);
R_API void r_load(const char *);
R_API SEXP r_call(SEXP, SEXP);
R_API SEXP r_function(const char *);
R_API SEXP r_named_arguments(uint32_t, SEXP);
R_API SEXP r_set_argument(const char *, SEXP, SEXP);
R_API SEXP r_eval(const char *);

#ifdef __cplusplus
}
#endif

#endif /* BINDING_H */
