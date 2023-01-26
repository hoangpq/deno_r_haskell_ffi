# install.packages("svglite")
save_svg <- function(a, b = 2, c) {
  cat("a received:", a, "\n")
  cat("b received:", b, "\n")
  cat("c received:", c, "\n")

  svglite::svglite("playground/plot.svg")
  # Create some data
  x <- c("A", "B", "C", "D")
  y <- c(3, 5, 2, 8)
  # Plot the data
  barplot(y, names.arg = x, xlab = "Categories", ylab = "Values", main = "Bar Plot Example")
  # plot(1:11, (-5:5)^2, type = 'b', main = "Simple Example")
  dev.off()
  return (1)
}

add1 <- function(a) {
  cat("add1 received:", a, " ")
  cat("\nend func1\n")
  return(a + 1)
}

add2 <- function(a) {
  cat("add2 received:", a, " ")
  cat("\nend func2\n")
  return(a)
}
