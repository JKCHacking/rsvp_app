package main

import (
	"time"

	"github.com/JKCHacking/rsvp_app/backend/database"
	"github.com/JKCHacking/rsvp_app/backend/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	database.ConnectDatabase()
	router.POST("/api/1/visitor", handlers.PostVisitor)
	router.GET("/api/1/visitor", handlers.GetVisitors)
	router.POST("/api/1/auth/login", handlers.PostLogin)
	router.Run(":5000")
}
