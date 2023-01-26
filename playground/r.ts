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

  RInstance.eval(`
    r_test <- function(a = c(3, 5, 2, 8)) { 
      cat("Value from R:", a, "\n")
      svglite::svglite("playground/plot.svg")
      # Create some data
      x <- c("A", "B", "C", "D")
      y <- a
      # Plot the data
      barplot(y, names.arg = x, xlab = "Categories", ylab = "Values", main = "Bar Plot Example")
      # plot(1:11, (-5:5)^2, type = 'b', main = "Simple Example")
      dev.off()
      return (1)
    }`);
  RInstance.func("r_test")(NamedArgument.of("a", c(1, 2, 3, 20)));
  RInstance.eval("r_test()");
});
