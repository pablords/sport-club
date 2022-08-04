package servicesKafka

import (
	configProducer "checkin/src/config/kafka"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/segmentio/kafka-go"
)

func Producer(message []byte, topic string) {

	conn := configProducer.KafkaConfigProducer(topic)

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
