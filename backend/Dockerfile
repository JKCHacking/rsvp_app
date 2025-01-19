FROM golang:1.23-alpine AS builder

ENV CGO_ENABLED=1

RUN apk add --no-cache gcc libc-dev

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o backend

FROM alpine:latest

RUN apk add --no-cache sqlite

RUN apk add --no-cache curl

WORKDIR /app

COPY --from=builder /app/backend .

EXPOSE 5000

CMD ["./backend"]
