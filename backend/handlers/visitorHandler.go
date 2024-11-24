package handlers

import (
	"log"
	"net/http"

	"github.com/JKCHacking/rsvp_app/backend/database"
	"github.com/JKCHacking/rsvp_app/backend/models"
	"github.com/gin-gonic/gin"
)

func PostVisitor(c *gin.Context) {
	var visitor models.Visitor

	if err := c.ShouldBindJSON(&visitor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&visitor).Error; err != nil {
		log.Printf("Error registering visitor: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to register visitor"})
		return
	}

	c.JSON(http.StatusOK, visitor)
}
