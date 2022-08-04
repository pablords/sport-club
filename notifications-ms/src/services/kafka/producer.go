package servicesKafka

import (
	"log"
	config "notifications/src/config/kafka"
	"time"

	"github.com/google/uuid"
	"github.com/segmentio/kafka-go"
)

func Producer(message []byte) {

	conn, _ := config.KafkaConfig()

	conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
	_, err := conn.WriteMessages(
		kafka.Message{Value: message, Key: []byte(uuid.New().String())},
	)
	if err != nil {
		log.Fatal("failed to write messages:", err)
	}

	if err := conn.Close(); err != nil {
		log.Fatal("failed to close writer:", err)
	}

}
