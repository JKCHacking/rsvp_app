package handlers

import (
	"github.com/JKCHacking/rsvp_app/backend/database"
	"github.com/JKCHacking/rsvp_app/backend/models"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RegisterVisitor(c *gin.Context) {
	var visitor models.Visitor

	if err := c.ShouldBindJSON(&visitor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&visitor); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to register visitor"})
		return
	}

	c.JSON(http.StatusOK, visitor)
}
