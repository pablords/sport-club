package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"checkin/src/services"

	"github.com/gorilla/mux"
)

func AccesReleaseController(w http.ResponseWriter, r *http.Request) {
	GetStatus(w, r)
}

func GetStatus(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		fmt.Printf("error %s", err)
	}
	token := r.Header.Values("authorization")

	tokenValidated := strings.Split(token[0], " ")
	result := services.AccessRealaseService(id, tokenValidated)
	json.NewEncoder(w).Encode(result)
}
