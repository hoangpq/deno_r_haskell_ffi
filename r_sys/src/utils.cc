#include "utils.h"

void r_print(SEXP e) {
    int t = TYPEOF(e);
    int i = 0;

    if (TYPEOF(ATTRIB(e)) == LISTSXP)
        printf("[*has attr*] ");

    if (t == NILSXP) {
        printf("NULL value\n");
        return;
    }
    if (t == LANGSXP) {
        printf("language construct\n");
        return;
    }
    if (t == LISTSXP) {
        SEXP l = e;
        printf("dotted-pair list:\n");
        while (l != R_NilValue) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            };
            if (TAG(l) != R_NilValue) {
                printf("(TAG:");
                r_print(TAG(l));
                printf(") ");
            }
            r_print(CAR(l));
            l = CDR(l);
        }
        return;
    }
    if (t == REALSXP) {
        if (LENGTH(e) > 1) {
            printf("Vector of real variables: ");
            while (i < LENGTH(e)) {
                printf("%f", REAL(e)[i]);
                if (i < LENGTH(e) - 1) printf(", ");
                if (dumpLimit && i > dumpLimit) {
                    printf("...");
                    break;
                }
                i++;
            }
            putchar('\n');
        } else
            printf("Real variable %f\n", *REAL(e));
        return;
    }
    if (t == CPLXSXP) {
        if (LENGTH(e) > 1) {
            printf("Vector of complex variables: ");
            while (i < LENGTH(e)) {
                printf("%f+%fi", COMPLEX(e)[i].r, COMPLEX(e)[i].i);
                if (i < LENGTH(e) - 1) printf(", ");
                if (dumpLimit && i > dumpLimit) {
                    printf("...");
                    break;
                }
                i++;
            }
            putchar('\n');
        } else
            printf("Complex variable %f+%fi\n", COMPLEX(e)[0].r, COMPLEX(e)[0].i);
        return;
    }
    if (t == RAWSXP) {
        printf("Raw vector: ");
        while (i < LENGTH(e)) {
            printf("%02x", ((unsigned int) ((unsigned char *) RAW(e))[i]) & 0xff);
            if (i < LENGTH(e) - 1) printf(" ");
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            }
            i++;
        }
        putchar('\n');
        return;
    }
    if (t == EXPRSXP) {
        printf("Vector of %d expressions:\n", LENGTH(e));
        while (i < LENGTH(e)) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            };
            r_print(VECTOR_ELT(e, i));
            i++;
        }
        return;
    }
    if (t == INTSXP) {
        printf("Vector of %d integers:\n", LENGTH(e));
        while (i < LENGTH(e)) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            }
            printf("%d", INTEGER(e)[i]);
            if (i < LENGTH(e) - 1) printf(", ");
            i++;
        }
        putchar('\n');
        return;
    }
    if (t == LGLSXP) {
        printf("Vector of %d logicals:\n", LENGTH(e));
        while (i < LENGTH(e)) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            }
            printf("%d", INTEGER(e)[i]);
            if (i < LENGTH(e) - 1) printf(", ");
            i++;
        }
        putchar('\n');
        return;
    }
    if (t == VECSXP) {
        printf("Vector of %d fields:\n", LENGTH(e));
        while (i < LENGTH(e)) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            };
            r_print(VECTOR_ELT(e, i));
            i++;
        }
        return;
    }
    if (t == STRSXP) {
        printf("String vector of length %d:\n", LENGTH(e));
        while (i < LENGTH(e)) {
            if (dumpLimit && i > dumpLimit) {
                printf("...");
                break;
            };
            r_print(STRING_ELT(e, i));
            i++;
        }
        return;
    }
    if (t == CHARSXP) {
        printf("scalar string: \"%s\"\n", CHAR(e));
        return;
    }
    if (t == SYMSXP) {
        printf("Symbol, name: ");
        r_print(PRINTNAME(e));
        return;
    }
    if (t == S4SXP) {
        printf("S4 object\n");
        return;
    }
    printf("Unknown type: %d\n", t);
}