fn main() {
    println!("cargo:rustc-link-search={}", "/usr/local/Cellar/r/4.1.2/lib/");
    println!("cargo:rustc-link-lib=dylib={}", "R");

    cc::Build::new()
        .cpp(true)
        .include("r/binding.h")
        .include("r/include")
        .flag_if_supported("-w")
        .flag_if_supported("-std=c++11")
        .file("r/binding.cc")
        .compile("r");
}