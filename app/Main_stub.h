#include <HsFFI.h>
#if defined(__cplusplus)
extern "C" {
#endif
extern HsPtr eval(HsPtr a1, HsPtr a2, HsFunPtr a3);
extern HsInt32 goroutine(HsFunPtr a1);
extern void timer(HsFunPtr a1, HsInt a2);
extern HsPtr array(void);
#if defined(__cplusplus)
}
#endif

