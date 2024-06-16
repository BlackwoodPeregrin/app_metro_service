package pg

import (
	"auth/internal/config"
	"auth/internal/model"
    "fmt"

    "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type PostgresDB struct {
	DB *gorm.DB
}

func NewPostgresDB(config *config.Config) *PostgresDB {
	db, err := gorm.Open("postgres", config.DSN())
	if err != nil {
		panic("Failed to connect to database!")
	}
	db.AutoMigrate(&model.User{})
	return &PostgresDB{DB: db}
}

func (p *PostgresDB) CreateUser(user *model.User) error {
	fmt.Printf("%+v", user)
	return p.DB.Create(user).Error
}

func (p *PostgresDB) GetById(id uint) (*model.User, error) {
	var user model.User
	err := p.DB.Where("user_id = ?", id).First(&user).Error
	return &user, err
}

func (p *PostgresDB) GetByName(username string) (*model.User, error) {
	var user model.User
	err := p.DB.Where("username = ?", username).First(&user).Error
	return &user, err
}
