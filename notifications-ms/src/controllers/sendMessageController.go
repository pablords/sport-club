package controllers

import (
	"fmt"
	serviceEmail "notifications/src/services/email"
)

func SendMessage(name, email string) {
	fmt.Printf(name, email)
	serviceEmail.SendEmail(name, email)
}
