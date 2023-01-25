use std::process::Command;
use std::str;

fn main() {
    let output = Command::new("R")
        .args(["RHOME"])
        .output()
        .expect("failed to execute process");

    let r_home = str::from_utf8(&output.stdout).expect("R libPaths is missing").trim();
    println!("cargo:rustc-link-search={}", r_home.to_owned() + "/lib");
    println!("cargo:rustc-link-lib=dylib={}", "R");

    cc::Build::new()
        .cpp(true)
        .include("src/binding.h")
        .include("src/include")
        .flag_if_supported("-w")
        .flag_if_supported("-std=c++11")
        .file("src/binding.cc")
        .compile("r");
}