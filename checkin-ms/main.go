package main

// @title Swagger Example API
// @version 1.0
// @description This is a sample server celler server.

import (
	routes "checkin/src/routes"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	host := os.Getenv("APP_HOST")
	port := os.Getenv("APP_PORT")

	serverStarting := fmt.Sprintf("checkin is running http://%s:%s/api/v1", host, port)
	fmt.Println(serverStarting)

	errServer := http.ListenAndServe(":"+port, routes.Routes())
	if errServer != nil {
		log.Fatal("failed to close reader:", errServer)
	}

}
