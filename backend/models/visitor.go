package models

import "gorm.io/gorm"

type Visitor struct {
	gorm.Model
	FirstName     string `json:"firstName"`
	LastName      string `json:"lastName"`
	Going         bool   `json:"going"`
	Commute       bool   `json:"commute"`
	ContactNumber string `json:"contactNumber"`
}
