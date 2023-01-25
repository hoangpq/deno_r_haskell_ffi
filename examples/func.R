# install.packages("svglite")
save_svg <- function(a, b = 2, c) {
  cat("a received:", a, "\n")
  cat("b received:", b, "\n")
  cat("c received:", c, "\n")

  svglite::svglite("examples/plot.svg")
  plot(1:11, (-5:5)^2, type = 'b', main = "Simple Example")
  dev.off()
  return (1)
}

add1 <- function(a) {
  cat("add1 received:", a, " ")
  cat("\n")

  return(a + 1)
}

add2 <- function(a) {
  cat("add2 received:", a, " ")
  return(a)
}
