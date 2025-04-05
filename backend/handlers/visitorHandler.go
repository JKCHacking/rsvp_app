package handlers

import (
	"net/http"
	"strings"

	"github.com/JKCHacking/rsvp_app/backend/database"
	"github.com/JKCHacking/rsvp_app/backend/models"
	"github.com/gin-gonic/gin"
)

type CompanionPayload struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type VisitorPayload struct {
	FirstName     string            `json:"firstName"`
	LastName      string            `json:"lastName"`
	ContactNumber string            `json:"contactNumber"`
	Going         bool              `json:"going"`
	Car           bool              `json:"car"`
	Companion     *CompanionPayload `json:"companion"` // optional
}

func PostVisitor(c *gin.Context) {
	var payload VisitorPayload

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if visitor already exists
	var existing models.Visitor
	if err := database.DB.Where("LOWER(first_name) = ? AND LOWER(last_name) = ?", strings.ToLower(payload.FirstName), strings.ToLower(payload.LastName)).First(&existing).Error; err == nil {
		// Found existing visitor
		c.JSON(http.StatusConflict, gin.H{
			"message": "Main visitor already exists",
		})
		return
	}

	if err := database.DB.Where("LOWER(first_name) = ? AND LOWER(last_name) = ?", strings.ToLower(payload.Companion.FirstName), strings.ToLower(payload.Companion.LastName)).First(&existing).Error; err == nil {
		// Found existing visitor
		c.JSON(http.StatusConflict, gin.H{
			"message": "Companion already exists",
		})
		return
	}

	mainVisitor := models.Visitor{
		FirstName:     payload.FirstName,
		LastName:      payload.LastName,
		ContactNumber: payload.ContactNumber,
		Going:         payload.Going,
		Car:           payload.Car,
		IsCompanion:   false,
	}

	if err := database.DB.Create(&mainVisitor).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save main visitor"})
		return
	}

	if payload.Companion != nil && payload.Companion.FirstName != "" {
		companion := models.Visitor{
			FirstName:     payload.Companion.FirstName,
			LastName:      payload.Companion.LastName,
			ContactNumber: payload.ContactNumber,
			Going:         payload.Going,
			Car:           payload.Car,
			IsCompanion:   true,
			MainVisitorID: &mainVisitor.ID,
		}

		if err := database.DB.Create(&companion).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save companion"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"message": "RSVP saved successfully"})
}

func GetVisitors(c *gin.Context) {
	var visitors []models.Visitor

	result := database.DB.Find(&visitors)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to get visitors: " + result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, visitors)
}
