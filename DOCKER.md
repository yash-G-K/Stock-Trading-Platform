# Local Docker quick start 🐳

This repo includes Dockerfiles for `backend` and `dashboard`, and a `docker-compose.yml` for local demo/development.

Quick steps:

1. Create a `.env.docker` file at the project root with the following values (example in `.env.example.docker`):

   MONGO_URL=mongodb://mongo:27017/stockapp
   CLIENT_URL=http://localhost:3000

2. Start services:

   docker compose up --build

3. Access apps:

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: mongodb://localhost:27017 (if you need to connect via a client)

Notes:
- The compose file includes a local `mongo` service to make it easy to demo without Atlas.
- For production deployments, point `MONGO_URL` at your Atlas cluster and do not run the `mongo` service.
