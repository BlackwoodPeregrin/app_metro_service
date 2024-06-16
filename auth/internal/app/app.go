package app

import (
	"auth/internal/config"
	"auth/internal/controllers"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type App struct {
	provider  *provider
	publicSrv *gin.Engine
}

func New() App {
	a := App{}
	a.initDeps()
	a.initServer(a.provider.authController)
	return a
}

func (a *App) Run() {
	a.runServer()
}

func (a *App) initDeps() {
	config.LoadConfig()
	a.provider = newProvider()
	a.initServer(a.provider.authController)
}

func (a *App) initServer(authController *controllers.AuthController) {
	a.publicSrv = gin.Default()

	a.publicSrv.Use(cors.New(*a.provider.config.CorsConfig))

	a.publicSrv.Static("/", "./frontend")
	a.publicSrv.POST("/register", authController.Register)
	a.publicSrv.POST("/login", authController.Login)
	a.publicSrv.POST("/refresh", authController.Refresh)
	a.publicSrv.NoRoute(func(c *gin.Context) {
		c.File("./frontend/index.html")
	})
}

func (a *App) runServer() {
	a.publicSrv.Run(fmt.Sprintf(":%s", a.provider.config.Port))
}
