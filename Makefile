.PHONY: up down build

FRONT_PATH := frontend
STATIC_PATH := auth/frontend

build:
	cd ${FRONT_PATH} && npm ci && npm run build
	mkdir -p ${STATIC_PATH}
	cp -r ${FRONT_PATH}/build/ ${STATIC_PATH}/

up:
	docker compose up -d

down:
