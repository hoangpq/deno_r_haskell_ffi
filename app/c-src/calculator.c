#include <stdio.h>

extern int *eval(const char *, int *);

#define INPUT_LEN 500

int main(int argc, char*argv[])
{
    int r;
    char input[INPUT_LEN];

    for (;;) {
        printf("> ");
        if (fgets(input, INPUT_LEN, stdin) == NULL) break;
        if (eval(input, &r) != NULL) {
            printf("%d\n", r);
        } else {
            printf("syntax error\n");
        }
    }
    printf("\n");

    return 0;
}