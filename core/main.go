package main

import (
	"bufio"
	"fmt"
	"net"
	"sync"
)

type Server struct {
	data map[string]string
	mu   sync.RWMutex
}

func (s *Server) handleConnection(conn net.Conn) {
	defer conn.Close()
	scanner := bufio.NewScanner(conn)
	for scanner.Scan() {
		cmd := scanner.Text()
		fmt.Println(cmd)
		conn.Write([]byte("+OK\r\n"))
	}
}

func main() {
	s := &Server{data: make(map[string]string)}
	ln, _ := net.Listen("tcp", ":6379")
	for {
		conn, _ := ln.Accept()
		go s.handleConnection(conn)
	}
}
