package routes

import (
	"checkin/src/controllers"
	"net/http"

	"github.com/gorilla/mux"
)

func Routes() *mux.Router {
	r := mux.NewRouter()

	api := r.PathPrefix("/api/v1").Subrouter()

	api.HandleFunc("/health", controllers.HeathCheckController).Methods(http.MethodGet)
	api.HandleFunc("/access-release/{id}", controllers.AccesReleaseController).Methods(http.MethodGet)

	return api
}
