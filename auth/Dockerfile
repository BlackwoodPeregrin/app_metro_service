# build
FROM golang:1.22-alpine AS build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o main ./cmd/http

# start
FROM alpine:latest

WORKDIR /app

COPY .env .
COPY ./frontend ./frontend

COPY --from=build /app/main .

CMD ["./main"]
