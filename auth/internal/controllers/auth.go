package controllers

import (
    "auth/internal/model"
    "auth/internal/service"

    "net/http"

    "github.com/gin-gonic/gin"
    "golang.org/x/crypto/bcrypt"
)

type AuthController struct {
    authService service.AuthService
}

func NewAuthController(authService service.AuthService) *AuthController {
    return &AuthController{authService: authService}
}

type RegisterInput struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required"`
    UserID   uint   `json:"id"       binding:"required"`
    Role     string `json:"role" binding:"required"`
}

type LoginInput struct {
    Username string `json:"username" binding:"required"`
    Password string `json:"password" binding:"required"`
}

type RefreshInput struct {
    Token string `json:"token" binding:"required"`
}

func (a *AuthController) Register(c *gin.Context) {
    var input RegisterInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)

    user := model.User{
        Username: input.Username,
        Password: string(hashedPassword),
        UserID: input.UserID,
        Role: input.Role,
    }
    err := a.authService.Register(&user)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Duplicate user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

func (a *AuthController) Login(c *gin.Context) {
    var input LoginInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    tokens, err := a.authService.Login(input.Username, input.Password)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"access": tokens[0], "refresh": tokens[1]})
}

func (a *AuthController) Refresh(c *gin.Context) {
    var input RefreshInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    newToken, err := a.authService.Refresh(input.Token)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"message": "Token error"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"newToken": newToken})
}
