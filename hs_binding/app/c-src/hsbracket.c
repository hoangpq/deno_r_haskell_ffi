/* This file is hsbracket.c. */
#include <stdio.h>
#include <HsFFI.h>

#if defined(__cplusplus)
extern "C" {
#endif

void __attribute__((constructor)) my_enter();

void __attribute__((destructor)) my_exit();

typedef void (*callback)(int);

extern void register_cb(callback *f) {
    printf("register_cb %p\n", f);
}

extern int *eval(const char *, int *);

extern void *goroutine(callback *);

extern void my_enter(void) {
    static char *argv[] = {"libEval.dylib", 0}, **argv_ = argv;
    static int argc = 1;
    hs_init(&argc, &argv_);
}

extern void my_exit(void) {
    hs_exit();
}

#if defined(__cplusplus)
}
#endif