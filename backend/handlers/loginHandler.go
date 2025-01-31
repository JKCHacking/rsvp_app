package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
)

func PostLogin(c *gin.Context) {
	keycloakUrl := os.Getenv("KEYCLOAK_URL")
	realm := os.Getenv("KEYCLOAK_REALM")
	clientID := os.Getenv("KEYCLOAK_CLIENT_ID")
	clientSecret := os.Getenv("KEYCLOAK_CLIENT_SECRET")

	var creds struct {
		Username string
		Password string
	}
	c.BindJSON(&creds)
	tokenURL := fmt.Sprintf("%s/realms/%s/protocol/openid-connect/token", keycloakUrl, realm)
	resp, err := http.PostForm(tokenURL, url.Values{
		"client_id":     {clientID},
		"client_secret": {clientSecret},
		"grant_type":    {"password"},
		"username":      {creds.Username},
		"password":      {creds.Password},
	})

	if err != nil || resp.StatusCode != 200 {
		c.JSON(401, gin.H{"error": fmt.Sprintf("Invalid credetials. error: %v", err)})
		return
	}

	var token struct {
		AccessToken  string `json:"access_token"`
		RefreshToken string `json:"refresh_token"`
	}

	json.NewDecoder(resp.Body).Decode(&token)
	c.SetCookie("access_token", token.AccessToken, 3600, "/", "", false, true)
	c.SetCookie("refresh_token", token.RefreshToken, 3600, "/", "", false, true)
	c.JSON(200, gin.H{"message": "Login successful", "redirect": "/dashboard"})
}

func PostLogout(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")

	keycloakUrl := os.Getenv("KEYCLOAK_URL")
	realm := os.Getenv("KEYCLOAK_REALM")
	clientID := os.Getenv("KEYCLOAK_CLIENT_ID")
	clientSecret := os.Getenv("KEYCLOAK_CLIENT_SECRET")

	if keycloakUrl == "" || realm == "" || clientID == "" || clientSecret == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Keycloak config is missing"})
		return
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("An error occured while getting refresh_token %v", err)})
		return
	}

	if refreshToken == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing refresh token"})
		return
	}

	logoutURL := fmt.Sprintf("%s/realms/%s/protocol/openid-connect/logout", keycloakUrl, realm)

	formData := url.Values{
		"client_id":     {clientID},
		"client_secret": {clientSecret},
		"refresh_token": {refreshToken},
	}

	resp, err := http.PostForm(logoutURL, formData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to communicate with Keycloak"})
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusNoContent {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Failed to log out"})
		return
	}

	c.SetCookie("access_token", "", -1, "/", "", false, true)
	c.SetCookie("refresh_token", "", -1, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}
