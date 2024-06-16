.PHONY: up down prehook build

FRONT_PATH := frontend
STATIC_PATH := auth/frontend

prehook:
	git checkout docker

build: prehook
	cd ${FRONT_PATH} && npm ci && npm run build
	cd ${FRONT_PATH} && mkdir -p ${FRONT_PATH}
	cp -r ${FRONT_PATH}/build/ ${STATIC_PATH}

up:
	docker compose up -d

down:
	docker compose down