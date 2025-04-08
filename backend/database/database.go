package database

import (
	"log"

	"github.com/JKCHacking/rsvp_app/backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("/app/data/rsvp.db"), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	DB.AutoMigrate(&models.Visitor{})
}
