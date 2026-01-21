# 🚀 FlowTasks - Setup Guide

## Quick Start (Step-by-Step)

### 1️⃣ Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Windows PowerShell:
Copy-Item .env.example .env

# Linux/Mac:
cp .env.example .env
```

**Edit `server/.env` file:**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
CLIENT_URL=http://localhost:5173
```

**Start backend server:**
```bash
npm run dev
```

Backend will run on `http://localhost:5000` ✅

---

### 2️⃣ Frontend Setup

**Open a NEW terminal window:**

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Create .env file
# Windows PowerShell:
Copy-Item .env.example .env

# Linux/Mac:
cp .env.example .env
```

**Edit `client/.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend dev server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173` ✅

---

### 3️⃣ MongoDB Atlas Setup (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Login
3. Create a new cluster (Free tier: M0)
4. Go to **Database Access** → Create database user
5. Go to **Network Access** → Add IP Address (0.0.0.0/0 for development)
6. Go to **Database** → Click **Connect** → Choose **Connect your application**
7. Copy the connection string
8. Replace `<password>` with your database user password
9. Replace `<dbname>` with `todolist`
10. Paste in `server/.env` as `MONGODB_URI`

**Example:**
```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/todolist?retryWrites=true&w=majority
```

---

### 4️⃣ Test the Application

1. Open browser: `http://localhost:5173`
2. You'll see **Login/Register** form
3. Click **Register** tab
4. Enter:
   - Name: Your name
   - Email: test@example.com
   - Password: 123456 (min 6 characters)
5. Click **Create Account**
6. You'll be logged in automatically! 🎉
7. Now you can:
   - Add tasks
   - Mark as complete
   - Filter tasks
   - Delete tasks

---

## 🐛 Troubleshooting

### Backend Issues

**Error: MongoDB connection failed**
- Check your `MONGODB_URI` in `.env`
- Make sure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify database user password is correct

**Error: Port 5000 already in use**
- Change `PORT=5001` in `server/.env`
- Update `VITE_API_URL` in `client/.env` to match

**Error: JWT_SECRET not found**
- Make sure `.env` file exists in `server/` folder
- Check `JWT_SECRET` is set in `.env`

### Frontend Issues

**Error: Cannot connect to API**
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in `client/.env`
- Verify CORS settings in backend

**Error: Module not found**
- Run `npm install` again in `client/` folder
- Delete `node_modules` and `package-lock.json`, then `npm install`

---

## 📝 Development Commands

### Backend
```bash
cd server
npm run dev    # Start with nodemon (auto-restart)
npm start      # Start production server
```

### Frontend
```bash
cd client
npm run dev    # Start Vite dev server
npm run build  # Build for production
npm run preview # Preview production build
```

---

## ✅ Checklist

- [ ] Backend dependencies installed (`server/node_modules`)
- [ ] Frontend dependencies installed (`client/node_modules`)
- [ ] `server/.env` file created and configured
- [ ] `client/.env` file created and configured
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB connection string added to `server/.env`
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can register/login successfully
- [ ] Can add/edit/delete tasks

---

## 🎉 You're All Set!

Your MERN Todo List app is ready! Start building amazing features! 🚀
