package repository

import "auth/internal/model"

type UserRepository interface {
	CreateUser(user *model.User) error
	GetById(id uint) (*model.User, error)
	GetByName(username string) (*model.User, error)
}
