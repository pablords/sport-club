package config

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/segmentio/kafka-go"
)

func KafkaConfigConsumer() (*kafka.Conn, *kafka.Reader) {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	broker_kafka := os.Getenv("BROKER_KAFKA")

	topic := "partner-contract"
	partition := 0
	groupId := "partners-contract-group-id"
	broker := broker_kafka

	conn, err := kafka.DialLeader(context.Background(), "tcp", broker, topic, partition)
	if err != nil {
		log.Fatal("failed to dial leader:", err)
	}

	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:        []string{broker},
		Topic:          topic,
		GroupID:        groupId,
		MinBytes:       10e3, // 10KB
		MaxBytes:       10e6, // 10MB
		CommitInterval: time.Second,
		MaxWait:        3 * time.Second,
		StartOffset:    kafka.LastOffset,
	})

	return conn, reader

}
