package config

import (
	"context"
	"log"
	"os"

	"github.com/segmentio/kafka-go"
)

func KafkaConfigProducer(topic string) *kafka.Conn {
	broker_kafka := os.Getenv("BROKER_KAFKA")

	conn, err := kafka.DialLeader(context.Background(), "tcp", broker_kafka, topic, 0)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}
	return conn

}
