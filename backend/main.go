package main

import (
	"github.com/JKCHacking/rsvp_app/backend/database"
	"github.com/JKCHacking/rsvp_app/backend/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	database.ConnectDatabase()
	router.POST("/api/1/visitor", handlers.PostVisitor)
	router.Run(":5000")
}
