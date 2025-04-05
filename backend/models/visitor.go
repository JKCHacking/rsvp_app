package models

import (
	"time"
)

type Visitor struct {
	ID            uint   `gorm:"primaryKey"`
	FirstName     string `json:"firstName" gorm:"not null"`
	LastName      string `json:"lastName" gorm:"not null"`
	ContactNumber string `json:"contactNumber"`
	Going         bool   `json:"going"`
	Car           bool   `json:"car"`
	IsCompanion   bool   `json:"isCompanion"`
	MainVisitorID *uint  `json:"-"`

	CreatedAt time.Time
	UpdatedAt time.Time
}
