## Quick deployment guide (Vercel + Render + MongoDB Atlas) 🔧

### 1) MongoDB Atlas (DB)
- Create a free cluster at https://cloud.mongodb.com/
- Create a DB user and set a strong password.
- Add your server IP / 0.0.0.0/0 for dev to Network Access.
- Copy the connection string and replace credentials and DB name.
- IMPORTANT: If `.env` with credentials is already committed, immediately rotate (change) the DB user password in Atlas and remove the file from git history.
  - To stop tracking an existing file: `git rm --cached backend/.env && git commit -m "remove backend .env"`
  - Follow with a password rotation in Atlas.

### 2) Backend (Render / Railway)
- Provider: https://render.com or https://railway.app
- Connect your GitHub repo and choose the `backend` directory.
- Set the build & start commands (Render will detect Node automatically):
  - Start command: `npm start`
- Set environment variables in the provider's dashboard (do NOT commit `.env`):
  - `MONGO_URL` (connection string), `PORT` (optional), `CLIENT_URL` (frontend URL), `JWT_SECRET`

### 3) Frontend (Vercel / Netlify)
- Provider: https://vercel.com or https://netlify.com
- Connect your GitHub repo and choose the `dashboard` project (or `frontend` if you want that app)
- Build command: `npm run build`
- Publish directory: `build`
- Add env var: `REACT_APP_API_URL` set to your deployed backend URL (e.g. `https://your-backend.onrender.com`)

### 4) CORS
- Backend now reads `CLIENT_URL` to restrict CORS in production; set it to your frontend URL in the host dashboard.

### 5) Test
- Visit the frontend URL and open devtools → Network / Console to check requests.
- Check backend logs for connectivity issues and fix environment variables if necessary.

### 6) Security checklist ✅
- Remove committed secrets from repo and rotate credentials.
- Use provider environment variables to store secrets.
- Use HTTPS (Vercel/Render provide TLS automatically).

---
If you'd like, I can also:
- Create a Git branch with these changes and open a PR, or
- Add a GitHub Actions workflow for CI/CD (build + tests + deploy), or
- Create a simple `Dockerfile` and `docker-compose.yml` for containerized deployments.

---

### 7) Local Docker quick demo 🐳
- We added `Dockerfile`s for `backend` and `dashboard`, plus a top-level `docker-compose.yml` for local demos.
- Quick run:
  1. Copy `.env.example.docker` to `.env.docker` and update values (e.g., `MONGO_URL`, `CLIENT_URL`).
  2. Start containers: `docker compose up --build`
  3. Visit: `http://localhost:3000` (dashboard) and `http://localhost:5000` (backend)

Notes:
- The compose file includes a local `mongo` service for easy demos. For production, use Atlas and point `MONGO_URL` there, and do not run the `mongo` service.
