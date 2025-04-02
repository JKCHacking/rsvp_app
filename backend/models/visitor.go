package models

import "gorm.io/gorm"

type Visitor struct {
	gorm.Model
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	ContactNumber string `json:"contactNumber"`
	Going         bool   `json:"going"`
	Car           bool   `json:"car"`
}
