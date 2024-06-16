package config

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/joho/godotenv"
)

type Config struct {
	dsn         string
	Port        string
	CurrentHost string
	CorsConfig  *cors.Config
}

func (c *Config) DSN() string {
	if c.dsn == "" {
		c.dsn = fmt.Sprintf(
			"host=%s port=%s user=%s dbname=%s password=%s sslmode=disable",
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_USER"),
			os.Getenv("DB_NAME"),
			os.Getenv("DB_PASSWORD"),
		)
	}
	fmt.Printf("dsn = %s", c.dsn)
	return c.dsn
}

func LoadConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}

func newCorsConfig() *cors.Config {
	return &cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"http://localhost:8080",
		},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
}

func New() *Config {
	port := os.Getenv("PORT")
	if port == "" {
		log.Fatalln("NO PORT IN CONFIG")
	}
	currentHost := os.Getenv("CURRENT_HOST")
	if currentHost == "" {
		log.Fatalln("NO HOST IN CONFIG")
	}
	cfg := Config{
		Port:        port,
		CurrentHost: currentHost,
		CorsConfig:  newCorsConfig(),
	}

	return &cfg
}
