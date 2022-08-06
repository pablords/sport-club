package controllers

import (
	"encoding/json"
	"net/http"
	"time"
)

type Response struct {
	Message string `json:"message"`
	Date    string `json:"date"`
}

func HeathCheckController(w http.ResponseWriter, r *http.Request) {
	getStatus(w, r)
}

func getStatus(w http.ResponseWriter, r *http.Request) {
	now := time.Now()
	json.NewEncoder(w).Encode(Response{Message: "checkin-ms is running", Date: now.Format(time.RFC822)})
}
