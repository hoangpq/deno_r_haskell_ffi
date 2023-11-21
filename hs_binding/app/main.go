package main

import (
	"fmt"
)

func main() {
	c := make(chan int, 0)
	go func() {
		fmt.Println("Hello goroutine")
		c <- 1
	}()

	<-c
	fmt.Println("Done")
}
