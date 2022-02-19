#include <string.h>
#include "jni.h"

JNIEXPORT jstring JNICALL
Java_com_akavel_hello2_HelloActivity_stringFromJNI(JNIEnv *env, jobject thiz) {
    return (*env)->NewStringUTF(env, "Hello from JNI..!");
}