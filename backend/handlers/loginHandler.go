package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/gin-gonic/gin"
)

func PostLogin(c *gin.Context) {
	var creds struct {
		Username string
		Password string
	}
	c.BindJSON(&creds)
	resp, err := http.PostForm("http://keycloak-server:8080/realms/myrealm/protocol/openid-connect/token", url.Values{
		"client_id":     {"my-client"},
		"client_secret": {"BWECPxOjnRapY8kKNWCVLE9qgDKORB8r"},
		"grant_type":    {"password"},
		"username":      {creds.Username},
		"password":      {creds.Password},
	})

	if err != nil || resp.StatusCode != 200 {
		c.JSON(401, gin.H{"error": fmt.Sprintf("Invalid credetials. error: %v", err)})
		return
	}

	var token struct {
		AccessToken string `json:"access_token"`
	}

	json.NewDecoder(resp.Body).Decode(&token)
	c.SetCookie("access_token", token.AccessToken, 3600, "/", "", false, true)
	c.JSON(200, gin.H{"message": "Login successful", "redirect": "/dashboard"})
}
