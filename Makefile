run:
	docker compose up -d
volumes:
	docker volume create auth-service_db
network:
	docker network create auth-service_network