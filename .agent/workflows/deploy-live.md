---
description: Deploy Stock Trading Platform Live (One-Click Access)
---

# 🚀 Deploy Your Stock Trading Platform Live

This guide will help you deploy your application so you can access it with one click from anywhere.

## Overview
You have 3 parts to deploy:
1. **Database** (MongoDB Atlas) - Stores your data
2. **Backend** (Render/Railway) - API server
3. **Frontend/Dashboard** (Vercel/Netlify) - User interface

---

## STEP 1: Setup MongoDB Atlas (Database) ☁️

### 1.1 Create Free MongoDB Account
1. Go to https://cloud.mongodb.com/
2. Click "Try Free" or "Sign Up"
3. Create account with email/password or Google sign-in
4. Choose "FREE" tier (M0 Sandbox)

### 1.2 Create Database Cluster
1. After login, click "Build a Database"
2. Choose **FREE** tier (M0)
3. Select a cloud provider (AWS recommended) and region closest to you
4. Name your cluster (e.g., "StockTradingCluster")
5. Click "Create"

### 1.3 Create Database User
1. You'll see "Security Quickstart"
2. Create a username (e.g., `stockuser`)
3. **IMPORTANT**: Click "Autogenerate Secure Password" and **SAVE IT** in a notepad
4. Click "Create User"

### 1.4 Setup Network Access
1. In the "Where would you like to connect from?" section
2. Choose "My Local Environment"
3. Click "Add My Current IP Address"
4. **IMPORTANT**: Also click "Add IP Address" and enter `0.0.0.0/0` (allows access from anywhere - needed for deployment)
5. Click "Finish and Close"

### 1.5 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" driver
4. Copy the connection string (looks like: `mongodb+srv://stockuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
5. **Replace `<password>` with your actual password** from step 1.3
6. **Replace the database name** (add `/stocktrading` before the `?`):
   ```
   mongodb+srv://stockuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/stocktrading?retryWrites=true&w=majority
   ```
7. **SAVE THIS** - you'll need it for backend deployment

---

## STEP 2: Deploy Backend (Render) 🔧

### 2.1 Prepare Your Code
1. Make sure your backend code is pushed to GitHub
   - If not, create a GitHub account at https://github.com
   - Create a new repository
   - Push your code (I can help with this if needed)

### 2.2 Create Render Account
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended - easier integration)

### 2.3 Deploy Backend Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository
4. Configure the service:
   - **Name**: `stock-trading-backend` (or any name you like)
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.4 Add Environment Variables
1. Scroll down to "Environment Variables"
2. Click "Add Environment Variable" and add these:

   **Variable 1:**
   - Key: `MONGO_URL`
   - Value: [Paste your MongoDB connection string from Step 1.5]

   **Variable 2:**
   - Key: `PORT`
   - Value: `5000`

   **Variable 3:**
   - Key: `CLIENT_URL`
   - Value: `https://your-app-name.vercel.app` (we'll update this after frontend deployment)

   **Variable 4:**
   - Key: `JWT_SECRET`
   - Value: Create a random string (e.g., `mySecretKey12345!@#` or use https://randomkeygen.com/)

3. Click "Create Web Service"
4. Wait for deployment (5-10 minutes)
5. **SAVE YOUR BACKEND URL** (will be like `https://stock-trading-backend.onrender.com`)

---

## STEP 3: Deploy Dashboard (Vercel) 🎨

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)

### 3.2 Deploy Dashboard
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 3.3 Add Environment Variable
1. Click "Environment Variables"
2. Add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: [Your backend URL from Step 2.4] (e.g., `https://stock-trading-backend.onrender.com`)
3. Click "Deploy"
4. Wait for deployment (3-5 minutes)

### 3.4 Get Your Live URL
1. After deployment, you'll see "Congratulations!"
2. Your dashboard URL will be like: `https://your-app-name.vercel.app`
3. **SAVE THIS URL** - this is your one-click access link!

---

## STEP 4: Update Backend CORS Settings 🔄

### 4.1 Update CLIENT_URL in Render
1. Go back to Render dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Find `CLIENT_URL` variable
5. Update the value to your Vercel dashboard URL (from Step 3.4)
6. Click "Save Changes"
7. Service will automatically redeploy

---

## STEP 5: Deploy Frontend (Landing Page) - Optional 🌐

If you also want to deploy the landing page (`frontend` folder):

### 5.1 Deploy to Vercel
1. In Vercel, click "Add New..." → "Project"
2. Import your repository again
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable if needed:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: [Your backend URL]
5. Click "Deploy"

---

## STEP 6: Test Your Live Application ✅

### 6.1 Access Your Dashboard
1. Open your browser
2. Go to your Vercel dashboard URL: `https://your-app-name.vercel.app`
3. **Bookmark this page** for one-click access!

### 6.2 Test Functionality
1. Try signing up/logging in
2. Check if data loads correctly
3. Test placing orders, viewing holdings, etc.
4. Open browser DevTools (F12) → Console to check for errors

### 6.3 Troubleshooting
If something doesn't work:
1. Check Render backend logs (Render dashboard → Logs tab)
2. Check browser console for errors (F12 → Console)
3. Verify all environment variables are correct
4. Make sure MongoDB connection string is correct

---

## 🎉 SUCCESS! Your App is Live!

### Your Live URLs:
- **Dashboard**: `https://your-app-name.vercel.app` ← **ONE-CLICK ACCESS**
- **Backend API**: `https://stock-trading-backend.onrender.com`
- **Landing Page** (if deployed): `https://your-landing-page.vercel.app`

### Next Steps:
1. **Bookmark** your dashboard URL
2. **Share** the link with others
3. **Custom Domain** (optional): Both Vercel and Render allow custom domains
4. **Mobile Access**: Your app works on mobile browsers too!

### Important Notes:
- Free tier services may "sleep" after inactivity (first load might be slow)
- Render free tier sleeps after 15 minutes of inactivity
- Keep your MongoDB password and JWT secret safe
- Never commit `.env` files to GitHub

---

## Need Help?
If you encounter issues:
1. Check deployment logs in Render/Vercel
2. Verify environment variables
3. Check MongoDB Atlas network access settings
4. Ask me for help with specific error messages!
