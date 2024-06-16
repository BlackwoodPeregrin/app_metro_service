package main

import "auth/internal/app"

func main() {
    application := app.New()
	application.Run()
}
