package main

import (
	routes "checkin/src/routes"
	services "checkin/src/services/kafka"
	"fmt"
	"log"
	"net/http"
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

	serverStarting := fmt.Sprintf("checkin is running at port %s", port)
	fmt.Println(serverStarting)

	log.Fatal(http.ListenAndServe(":"+port, routes.Routes()))

}
