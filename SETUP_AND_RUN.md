# 🚀 Stock Trading Platform - Complete Setup & Run Guide

## 📊 PROJECT OVERVIEW

**Project Name:** Stock Trading Platform  
**Type:** Full-Stack MERN Application  
**Architecture:** 3 Separate Applications  
**Status:** ✅ Ready to Run

---

## 🏗️ APPLICATION STRUCTURE

### **Ports Configuration:**
- **Backend API:** Port 5000 (Node.js + Express)
- **Frontend Landing:** Port 3000 (React)
- **Dashboard Trading UI:** Port 3001 (React)
- **MongoDB:** Port 27017 (Database)

### **Directory Structure:**
```
Stock Trading Platform/
├── backend/                    # REST API (Node + Express + MongoDB)
│   ├── index.js               # Main server file
│   ├── model/                 # Data models
│   ├── schemas/               # Mongoose schemas
│   └── package.json
├── frontend/                   # Landing page (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── dashboard/                  # Trading dashboard (React)
│   ├── src/
│   ├── public/
│   └── package.json
├── docker-compose.yml         # Docker setup
├── DEPLOY.md                  # Deployment guide
└── DOCKER.md                  # Docker guide
```

---

## ⚙️ SETUP OPTIONS

### **Option 1: Docker Setup (RECOMMENDED for beginners)**

#### Prerequisites:
- Docker installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Desktop running

#### Steps:
1. **Navigate to project directory:**
   ```bash
   cd "c:\Users\ASUS\OneDrive\Desktop\react.js\Stock Trading Platfrom App"
   ```

2. **Create `.env.docker` file:**
   ```bash
   echo MONGO_URL=mongodb://mongo:27017/stockapp > .env.docker
   echo CLIENT_URL=http://localhost:3000 >> .env.docker
   ```

3. **Start all services:**
   ```bash
   docker-compose up --build
   ```

4. **Access applications:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - API Docs: http://localhost:5000/

5. **Stop services:**
   ```bash
   docker-compose down
   ```

---

### **Option 2: Local Development (Windows/Mac/Linux)**

#### Prerequisites:
- Node.js v24.11.0+ ([Download](https://nodejs.org/))
- npm v11.6.1+
- MongoDB Community Edition ([Download](https://www.mongodb.com/try/download/community))

#### MongoDB Setup:

**A) Using MongoDB Community Edition:**
1. Install MongoDB Community Edition
2. Ensure MongoDB service is running:
   ```bash
   # Windows - Check in Services app
   # Mac - brew services list
   # Linux - systemctl status mongod
   ```

**B) Using MongoDB Atlas (Cloud):**
1. Create account at https://cloud.mongodb.com/
2. Create free cluster
3. Create database user (username: stockuser, strong password)
4. Whitelist IP address (0.0.0.0/0 for development)
5. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/stockapp`
6. Update `backend/.env` with your connection string

#### Backend Setup & Run:
1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Verify .env file:**
   ```bash
   # backend/.env should have:
   MONGO_URL=mongodb://localhost:27017/stockapp
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

4. **Start backend server:**
   ```bash
   npm start
   # You should see: "Connected to MongoDB"
   #                 "Server is running on port: 5000"
   ```

5. **Test backend:**
   - Open browser: http://localhost:5000
   - Should see: API running message with endpoints

#### Frontend Setup & Run (New Terminal):
1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start frontend:**
   ```bash
   npm start
   ```

4. **Access frontend:**
   - Browser automatically opens: http://localhost:3000
   - Should see landing page with navigation

#### Dashboard Setup & Run (New Terminal):
1. **Navigate to dashboard directory:**
   ```bash
   cd dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update environment:**
   ```bash
   # Verify .env file has:
   REACT_APP_API_URL=http://localhost:5000
   ```

4. **Start dashboard (different port):**
   ```bash
   PORT=3001 npm start
   ```

5. **Access dashboard:**
   - Browser: http://localhost:3001
   - Can only access after login from frontend

---

### **Option 3: Using MongoDB Atlas + Local Frontend/Backend**

1. **Get MongoDB Atlas Connection String:**
   - Log in to https://cloud.mongodb.com/
   - Go to Clusters → Connect → Driver
   - Copy connection string

2. **Update backend/.env:**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/stockapp
   PORT=5000
   CLIENT_URL=http://localhost:3000
   ```

3. **Run backend:**
   ```bash
   cd backend
   npm start
   ```

4. **Run frontend (new terminal):**
   ```bash
   cd frontend
   npm start
   ```

5. **Run dashboard (new terminal):**
   ```bash
   cd dashboard
   PORT=3001 npm start
   ```

---

## 🧪 TEST THE APPLICATION

### **1. Test Backend API:**
```bash
# Health check
curl http://localhost:5000/health

# Get all holdings
curl http://localhost:5000/allholdings

# Get all orders
curl http://localhost:5000/allorders
```

### **2. Test Frontend (User Flow):**
1. Open http://localhost:3000
2. Click "Signup" button
3. Register with:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123456
4. Click "Login" 
5. Enter registered credentials
6. Should redirect to Dashboard (http://localhost:3001)

### **3. Dashboard Features:**
- View Portfolio Summary
- Check Holdings
- See Open Positions
- View Order History
- Buy/Sell Orders
- Monitor Watch List

---

## ✅ EXPECTED OUTPUTS

### **Backend Started Successfully:**
```
Connected to MongoDB
Server is running on port: 5000
```

### **Frontend Started Successfully:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### **Dashboard Started Successfully:**
```
Compiled successfully!

You can now view dashboard in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.x.x:3001
```

---

## 🔌 API ENDPOINTS AVAILABLE

### **Health & Info:**
- `GET /` - API info & endpoints
- `GET /health` - Database connection status

### **Stocks/Holdings:**
- `GET /allholdings` - Get user holdings
- `GET /allpositions` - Get open positions
- `GET /allorders` - Get order history

### **Orders:**
- `POST /neworder` - Place new order
  ```json
  {
    "name": "INFY",
    "qty": 5,
    "price": 1500,
    "orderType": "BUY",
    "productType": "CNC"
  }
  ```

### **Authentication:**
- `POST /signup` - Register new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```

- `POST /login` - User login
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```

- `GET /user/:id` - Get user details

---

## 🐛 TROUBLESHOOTING

### **Problem: "MongoDB connection error"**
**Solution:**
- Ensure MongoDB is running locally OR
- Use Docker with `docker-compose up --build` OR
- Add valid MongoDB Atlas connection string

### **Problem: "Port 5000 already in use"**
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use different port
set PORT=5001
npm start
```

### **Problem: "Cannot find module 'express'"**
**Solution:**
```bash
npm install
```

### **Problem: "CORS error" when frontend calls backend**
**Solution:**
- Verify `backend/.env` has: `CLIENT_URL=http://localhost:3000`
- Ensure backend is running on port 5000
- Check browser console for exact error

### **Problem: Frontend won't compile**
**Solution:**
```bash
# Clear cache and reinstall
rm -r node_modules
npm install
npm start
```

### **Problem: "React App did not start"**
**Solution:**
```bash
# Try different port
PORT=3000 npm start

# Or
set PORT=3000
npm start
```

---

## 📁 KEY FILES & THEIR PURPOSES

| File | Purpose |
|------|---------|
| `backend/index.js` | Main API server with all routes |
| `backend/model/` | MongoDB data models |
| `backend/schemas/` | Mongoose schema definitions |
| `backend/.env` | Backend configuration (MONGO_URL, PORT) |
| `frontend/src/index.js` | Frontend routing & entry point |
| `frontend/src/landing_page/` | Marketing & auth pages |
| `dashboard/src/components/Dashboard.js` | Main dashboard component |
| `docker-compose.yml` | Multi-container setup |

---

## 📊 DATABASE COLLECTIONS

### **Users Collection:**
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "phone": String
}
```

### **Holdings Collection:**
```json
{
  "_id": ObjectId,
  "name": String,      // e.g., "INFY"
  "qty": Number,       // Quantity held
  "avg": Number,       // Average cost
  "price": Number,     // Current price
  "net": String,       // Net return
  "day": String        // Day return
}
```

### **Positions Collection:**
```json
{
  "_id": ObjectId,
  "product": String,   // "CNC" or "MIS"
  "name": String,
  "qty": Number,
  "avg": Number,
  "price": Number,
  "net": String,
  "day": String,
  "isLoss": Boolean
}
```

### **Orders Collection:**
```json
{
  "_id": ObjectId,
  "name": String,       // Stock symbol
  "qty": Number,
  "price": Number,
  "orderType": String,  // "BUY" or "SELL"
  "productType": String // "CNC" or "MIS"
}
```

---

## 🎯 NEXT STEPS AFTER SETUP

1. **Create test user:** Sign up from landing page
2. **Test API:** Use Postman or curl to test endpoints
3. **Add data:** Use provided APIs to create holdings/positions
4. **Customize:** Modify components and add features
5. **Deploy:** Follow DEPLOY.md for production deployment

---

## 📚 USEFUL COMMANDS

```bash
# Install all dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# View backend logs
npm start (with backend running)

# Check API health
curl http://localhost:5000/health

# Test signup
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Test123"}'
```

---

## 🔒 SECURITY NOTES

⚠️ **Important for Production:**
1. Never commit `.env` files to Git
2. Always use HTTPS in production
3. Implement JWT authentication
4. Add input validation on frontend
5. Use strong passwords
6. Enable CORS with specific domains only
7. Hash all passwords (already done with bcryptjs)
8. Add rate limiting to API endpoints

---

## 📞 SUPPORT

If you encounter issues:
1. Check error messages in terminal
2. Verify all prerequisites are installed
3. Try Option 1 (Docker) - most reliable
4. Check MongoDB connection
5. Clear node_modules and reinstall

---

**Ready to start? Choose your setup option above and follow the steps!** 🚀
