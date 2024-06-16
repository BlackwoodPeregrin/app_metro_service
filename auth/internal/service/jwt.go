package service

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JWTService interface {
	GenerateTokenPair(userID uint, role string) ([]string, error)
	GenerateAccess(userID uint, role string) (string, error)
	Refresh(input string) (string, error)
}

type UserData struct {
	UserID uint   `json:"id"`
	Role   string `json:"role"`
}

type jwtCustomClaims struct {
	UserData
	jwt.StandardClaims
}

type jwtService struct {
	secretKey     []byte
	issuer        string
	tokenLifeSpan time.Duration
}

func NewJWTService() JWTService {
	tokenLifespan, err := strconv.Atoi(os.Getenv("TOKEN_HOUR_LIFESPAN"))
	secret := []byte(os.Getenv("JWT_SECRET"))
	if err != nil || len(secret) == 0 {
		log.Fatalf("Token data not found")
	}
	return &jwtService{
		secretKey:     secret,
		issuer:        "auth",
		tokenLifeSpan: time.Duration(tokenLifespan),
	}
}

func (j *jwtService) GenerateAccess(userID uint, role string) (string, error) {
	accessClaims := &jwtCustomClaims{
		UserData: UserData{
			UserID: userID,
			Role:   role,
		},
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Minute * j.tokenLifeSpan).Unix(),
			Issuer:    j.issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	access, err := token.SignedString(j.secretKey)
	if err != nil {
		return "", err
	}
	return access, nil
}

func (j *jwtService) GenerateTokenPair(userID uint, role string) ([]string, error) {
	refreshClaims := &jwtCustomClaims{
		UserData{
			UserID: userID,
			Role:   role,
		},
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * time.Duration(24)).Unix(),
			Issuer:    j.issuer,
			IssuedAt:  time.Now().Unix(),
		},
	}

	refresh, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString(j.secretKey)
	if err != nil {
		return nil, err
	}
	access, err := j.GenerateAccess(userID, role)
	if err != nil {
		return nil, err
	}
	return []string{access, refresh}, nil
}

type Test struct {
	Qwe   int  `json:"qwe"`
	Hello rune `json:"hello"`
}

func (j *jwtService) Refresh(input string) (string, error) {
	token, _ := jwt.ParseWithClaims(input, &jwtCustomClaims{}, func(parsedToken *jwt.Token) (interface{}, error) {
		return j.secretKey, nil
	})

	if claims, ok := token.Claims.(*jwtCustomClaims); ok && token.Valid {
		newAccessToken, err := j.GenerateAccess(claims.UserID, claims.Role) // TODO: change after test
		if err != nil {
			return "", err
		}
		return newAccessToken, nil
	} else {
		return "", fmt.Errorf("token not valid")
	}

}
