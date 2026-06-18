# Docker Test With MongoDB

A simple Express.js + TypeScript + MongoDB application running with Docker.

## Prerequisites

- Docker Desktop
- Git

## Build Docker Image

```bash
docker build -t demo-app .
```

## Create Docker Network

```bash
docker network create demo-net
```

## Run MongoDB Container

```bash
docker run -d \
--name mongo \
--network demo-net \
mongo:7
```

## Check MongoDB Container

```bash
docker ps
```

## Run Application Container

Using MongoDB container IP:

```bash
docker run -d \
--name demo-app2 \
--network demo-net \
-p 4000:4000 \
-e MONGO_DB_URL="mongodb://172.18.0.2:27017/crud" \
demo-app
```

Recommended (using container name):

```bash
docker run -d \
--name demo-app2 \
--network demo-net \
-p 4000:4000 \
-e MONGO_DB_URL="mongodb://mongo:27017/crud" \
demo-app
```

## View Running Containers

```bash
docker ps
```

## View Application Logs

```bash
docker logs demo-app2
```

## View MongoDB Logs

```bash
docker logs mongo
```

## Inspect Docker Network

```bash
docker network inspect demo-net
```

## Stop Containers

```bash
docker stop demo-app2
docker stop mongo
```

## Remove Containers

```bash
docker rm demo-app2
docker rm mongo
```

## Remove Docker Network

```bash
docker network rm demo-net
```

## API Base URL

```text
http://localhost:4000
```

### Example Endpoint

```text
GET /crud/contacts/:id
```

Example:

```text
http://localhost:4000/crud/contacts/<contact-id>
```

## Project Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Docker
