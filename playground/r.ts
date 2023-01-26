import { c, NamedArgument, r_load, RInstance, runR } from "../core/mod.ts";

runR(() => {
  r_load("playground/func.R");
  const save_svg = RInstance.func("save_svg");

  /*save_svg(
    NamedArgument.of("a", 10),
    NamedArgument.of("b", 200),
    NamedArgument.of("c", 30),
  );*/

  const add1 = RInstance.func("add1");
  const res = add1(NamedArgument.raw("a", c(1, 2, 3, 20, 100)));
  RInstance.print(res);

  const add2 = RInstance.func("add2");
  add2(NamedArgument.raw("a", res));
  // RInstance.eval("2 + 2");
});
