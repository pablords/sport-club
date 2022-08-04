package servicesKafka

import (
	config "checkin/src/config/kafka"
	"context"
	"encoding/json"
	"fmt"
	"log"
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

	}

}

func Consumer(channel chan Message) {

	_, reader := config.KafkaConfigConsumer()

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
