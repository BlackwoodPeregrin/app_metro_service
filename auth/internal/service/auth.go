package service

import (
	"auth/internal/model"
	"auth/internal/repository"

	"golang.org/x/crypto/bcrypt"
)

type AuthService interface {
	Register(user *model.User) error
	Login(email string, password string) ([]string, error)
	Refresh(token string) (string, error)
}

type authUsecase struct {
	userRepository repository.UserRepository
	jwtService     JWTService
}

func NewAuthService(userRepo repository.UserRepository, jwtSvc JWTService) AuthService {
	return &authUsecase{
		userRepository: userRepo,
		jwtService:     jwtSvc,
	}
}

func (u *authUsecase) Register(user *model.User) error {
	return u.userRepository.CreateUser(user)
}

func (u *authUsecase) Login(username string, password string) ([]string, error) {
	user, err := u.userRepository.GetByName(username)
	if err != nil {
		return nil, err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return nil, err
	}

	tokens, err := u.jwtService.GenerateTokenPair(user.UserID, user.Role)
	return tokens, err
}

func (u *authUsecase) Refresh(token string) (string, error) {
	return u.jwtService.Refresh(token)
}
