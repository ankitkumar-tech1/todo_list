# FlowTasks - Premium Todo List App 🚀

A modern, premium-quality To-Do List web application built with the MERN stack (MongoDB, Express, React, Node.js) featuring fantastic animations, smooth micro-interactions, and clean architecture.

## ✨ Features

### Frontend (React)
- ✅ Modern React with functional components and hooks
- ✅ Tailwind CSS for styling
- ✅ Framer Motion for smooth animations
- ✅ Dark mode & Light mode toggle
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Glassmorphism UI design

### Core Features
- ✅ Add, edit, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All / Active / Completed)
- ✅ Task priority (Low / Medium / High)
- ✅ Due date support
- ✅ Toast notifications
- ✅ Optimistic UI updates

### Backend (Node + Express)
- ✅ REST API with clean MVC architecture
- ✅ JWT authentication
- ✅ User-specific tasks
- ✅ Protected routes
- ✅ Input validation
- ✅ Proper error handling

### Database (MongoDB)
- ✅ Mongoose schema with timestamps
- ✅ Cloud MongoDB (Atlas) compatible

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- bcryptjs

## 📁 Project Structure

```
todo_list/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers (Auth, Toast, Theme)
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # API service layer
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Global styles
│   │   └── theme/          # Theme context
│   └── package.json
│
└── server/                 # Node.js backend
    ├── src/
    │   ├── config/         # Database config
    │   ├── models/         # Mongoose models
    │   ├── controllers/    # Route controllers
    │   ├── routes/         # API routes
    │   ├── middleware/     # Auth & error middleware
    │   └── utils/          # Utility functions
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd todo_list
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Setup Environment Variables**

   **Backend** (`server/.env`):
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

   **Frontend** (`client/.env`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:5000`

6. **Start Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all tasks for logged-in user (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create new task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

## 🎨 Animations

- **Page Transitions**: Smooth fade + slide animations
- **Task Add**: Slide + fade in animation
- **Task Delete**: Scale down + fade out animation
- **Task Complete**: Strike-through + checkmark animation
- **Button Interactions**: Hover glow, ripple effects
- **Modal Animations**: Scale + fade transitions

## 🔐 Authentication Flow

1. User registers/logs in → JWT token received
2. Token stored in localStorage
3. Token sent in Authorization header for protected routes
4. Backend verifies token via middleware
5. User-specific tasks fetched

## 📝 Usage

1. **Register/Login**: Create an account or login
2. **Add Tasks**: Click "Add New Task" button
3. **Complete Tasks**: Click checkbox to mark as complete
4. **Filter Tasks**: Use filter tabs (All/Active/Completed)
5. **Delete Tasks**: Click delete icon on task card
6. **Toggle Theme**: Use theme toggle in header

## 🚢 Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend (Vercel)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

## 📄 License

This project is open source and available for learning purposes.

## 👨‍💻 Author

Built with ❤️ for portfolio and learning purposes.

---

**Note**: Make sure to change JWT_SECRET in production and use strong MongoDB credentials!