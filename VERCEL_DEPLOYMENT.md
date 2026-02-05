# 🌐 Deployment on Vercel - Complete Guide

## ✅ Changes Made to Fix Registration/Login on Vercel

Your project has been updated to work on Vercel. Here's what was fixed:

### 1. **API URL Fixed** 
   - Changed from: `http://localhost:5000/api` (only works locally)
   - Changed to: `/api` (relative path - works on any domain)
   - File: [client/.env](client/.env)

### 2. **CORS Configuration Updated**
   - Now supports Vercel's `VERCEL_URL` environment variable
   - File: [server/src/app.js](server/src/app.js)

### 3. **Environment Variable Template Created**
   - Created [server/.env.example](server/.env.example) for reference
   - Created [client/.env.example](client/.env.example) for reference

---

## 🚀 Steps to Deploy on Vercel

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Fix: Authentication on Vercel"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Select your GitHub repository
4. Click **"Deploy"**

### Step 3: ⚠️ IMPORTANT - Set Environment Variables

**After deployment:**
1. Go to your project on Vercel
2. Click **"Settings"**
3. Go to **"Environment Variables"**
4. Add these variables:

```
MONGODB_URI = [your-mongodb-connection-string]
JWT_SECRET = [your-secret-key]
```

**Example:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-here-change-in-production
```

5. Click **"Save"**

### Step 4: Redeploy

1. Go to **"Deployments"**
2. Click on the latest deployment
3. Click **"Redeploy"**

---

## ✅ Test Your Deployment

1. Open your Vercel URL
2. Try to **Register** a new account
3. Try to **Login** with that account
4. Try to add/edit/delete tasks

---

## ❌ Troubleshooting

### Problem: Registration/Login still shows errors

**Check:**
1. Environment variables are set in Vercel ✅
2. You redeployed after adding environment variables ✅
3. MongoDB Atlas IP whitelist includes all IPs (use `0.0.0.0/0`) ✅
4. `MONGODB_URI` is correct with proper username/password ✅

### Problem: "Cannot connect to API"

**Check:**
1. The deployment completed successfully
2. There are no errors in **Runtime Logs** (Deployments → View Logs)

### Problem: Database connection errors

**Check:**
1. `MONGODB_URI` is correct
2. MongoDB user password doesn't have special characters that need URL encoding
3. MongoDB Atlas IP whitelist is set to `0.0.0.0/0`

---

## 📝 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | Database connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `my-super-secret-key-12345` |

---

## 🎉 You're Done!

Your MERN Todo app is now deployed on Vercel with working authentication! 🚀

