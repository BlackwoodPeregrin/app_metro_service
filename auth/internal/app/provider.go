package app

import (
    "auth/internal/config"
    "auth/internal/controllers"
    "auth/internal/repository"
    "auth/internal/service"
    db "auth/internal/repository/pg"
)

type provider struct {
    config         *config.Config
    authController *controllers.AuthController
    authService    *service.AuthService
    jwtService     *service.JWTService
    repo           repository.UserRepository
}

func newProvider() *provider {
    config.LoadConfig()
    cfg := config.New()
    repo := db.NewPostgresDB(cfg)
    jwtService := service.NewJWTService()
    authService := service.NewAuthService(repo, jwtService)
    authController := controllers.NewAuthController(authService)

    return &provider{
        config:         cfg,
        repo:           repo,
        authController: authController,
        authService:    &authService,
        jwtService:     &jwtService,
    }
}
