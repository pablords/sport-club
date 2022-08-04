package servicesKafka

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	config "notifications/src/config/kafka"
	serviceEmail "notifications/src/services/email"
)

type Person struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

type Message struct {
	Key    string `json:"key"`
	Person string `json:"person"`
}

func SendMessage() {

	channel := make(chan Message)
	go Consumer(channel)

	for {
		msg, open := <-channel

		if !open {
			fmt.Println("Channel is Close")
			break
		}

		var dataJson Person
		if err := json.Unmarshal([]byte(msg.Person), &dataJson); err != nil {
			fmt.Println(err)
			fmt.Println("Can not unmarshal JSON")
		}
		serviceEmail.SendEmail(dataJson.Name, dataJson.Email)

	}

}

func Consumer(channel chan Message) {

	_, reader := config.KafkaConfig()

	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			break
		}
		channel <- Message{Key: string(m.Key), Person: string(m.Value)}
	}

	close(channel)
	if err := reader.Close(); err != nil {
		log.Fatal("failed to close reader:", err)
	}

}
