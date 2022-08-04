package routes

import (
	"checkin/src/controllers"
	"encoding/json"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

type Response struct {
	Message string `json:"message"`
	Date    string `json:"date"`
}

func Routes() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		now := time.Now()
		json.NewEncoder(w).Encode(Response{Message: "checkin-ms is running", Date: now.Format(time.RFC822)})
	})
	router.HandleFunc("/access-release/{id}", controllers.AccesReleaseController).Methods("GET")

	return router
}
