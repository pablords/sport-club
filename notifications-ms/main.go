package main

import (
	"fmt"
	"log"
	"net/http"
	routes "notifications/src/routes"
	services "notifications/src/services/kafka"
	"os"

	"github.com/joho/godotenv"
)

func main() {

	// load .env file
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	port := os.Getenv("APP_PORT")

	go services.SendMessage()

	serverStarting := fmt.Sprintf("Server is running at port %s", port)
	fmt.Println(serverStarting)

	log.Fatal(http.ListenAndServe(":"+port, routes.Routes()))

}
