# 🔗 Oorly - URL Shortener App

A full-stack URL shortening application built with React, Node.js, Express, and MongoDB.

## 📋 Table of Contents

- [✨ Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [🚀 Getting Started](#getting-started)
- [📦 Installation](#installation)
- [🔧 Environment Setup](#environment-setup)
- [▶️ Running the Application](#running-the-application)
- [🔌 API Endpoints](#api-endpoints)
- [💻 Usage](#usage)
- [🌐 Deployment](#deployment)
- [📝 License](#license)

---

## ✨ Features

- 🎯 **URL Shortening**: Create short, shareable links from long URLs
- ✏️ **Custom URLs**: Authenticated users can create custom short URLs
- 🔐 **User Authentication**: Secure signup/signin with JWT tokens
- 📊 **Dashboard**: View all created URLs with analytics
- 📈 **Click Tracking**: Monitor how many times each shortened URL is accessed
- 📱 **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- ✨ **Animations**: Smooth transitions with Framer Motion

---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ **React 19** - UI library
- ⚡ **Vite** - Build tool
- 🗺️ **TanStack Router** - Routing
- 🔄 **TanStack React Query** - Data fetching & caching
- 🏪 **Redux Toolkit** - State management
- 🎨 **Tailwind CSS** - Styling
- 🎬 **Framer Motion** - Animations
- 📋 **React Hook Form** - Form handling
- ✔️ **Zod** - Schema validation
- 🌐 **Axios** - HTTP client

### 🖥️ Backend
- 🟢 **Node.js** - Runtime environment
- 🚀 **Express.js** - Web framework
- 🍃 **MongoDB** - Database
- 🗄️ **Mongoose** - ODM
- 🔑 **JWT** - Authentication
- 🔒 **Bcrypt** - Password hashing
- 🆔 **nanoid** - Short ID generation

---

## 📁 Project Structure

```
url-shortener/
├── 📂 Frontend/
│   ├── 📂 src/
│   │   ├── 📁 api/              # 🌐 API calls
│   │   ├── 📁 components/       # 🧩 React components
│   │   ├── 📁 pages/            # 📄 Page components
│   │   ├── 📁 routing/          # 🗺️ Route configuration
│   │   ├── 📁 store/            # 🏪 Redux store & slices
│   │   ├── 📁 utils/            # 🛠️ Helper functions
│   │   ├── 📁 zod/              # ✔️ Validation schemas
│   │   └── 📄 main.jsx          # 🎯 Entry point
│   ├── 📄 .env                  # ⚙️ Environment variables
│   ├── 📄 .env.production       # 🌐 Production config
│   ├── 📄 index.html
│   ├── 📄 vite.config.js
│   ├── 📄 vercel.json           # 🚀 Vercel deployment config
│   └── 📄 package.json
│
└── 📂 Backend/
    ├── 📂 src/
    │   ├── 📁 controllers/      # 🎮 Route handlers
    │   ├── 📁 dao/              # 💾 Database operations
    │   ├── 📁 middleware/       # 🔧 Express middleware
    │   ├── 📁 models/           # 📊 MongoDB schemas
    │   ├── 📁 routes/           # 🛣️ API routes
    │   ├── 📁 services/         # ⚙️ Business logic
    │   ├── 📁 utils/            # 🛠️ Helper utilities
    │   ├── 📁 zod/              # ✔️ Validation schemas
    │   └── 📁 db/               # 🗄️ Database connection
    ├── 📂 config/               # ⚙️ Configuration files
    ├── 📄 .env                  # 🔐 Environment variables
    ├── 📄 .env.example          # 📝 Example config
    ├── 📄 app.js                # 🚀 Main app file
    └── 📄 package.json
```



---

## 🚀 Getting Started

### 📋 Prerequisites

- 🟢 **Node.js** (v18+)
- 📦 **npm** or **yarn**
- 🍃 **MongoDB** account (for database)

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd url-shortener

2️⃣ Install Frontend Dependencies
cd Frontend
npm install

3️⃣ Install Backend Dependencies
cd ../Backend
npm install

🔧 Environment Setup

🎨 Frontend Configuration
Create .env file in the Frontend directory:
VITE_API_URL=http://localhost:3000

For production, update .env.production:
VITE_API_URL=https://your-backend-domain.com


🖥️ Backend Configuration
Create .env file in the Backend directory:
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/url-shortener
JWT_SECRET_USER=your_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=3000
__________________________________________

▶️ Running the Application
🔧 Development Mode

Terminal 1️⃣ - Backend:
cd Backend
npm run dev
Backend runs on http://localhost:3000 🖥️

Terminal 2️⃣ - Frontend:
cd Frontend
npm run dev
Frontend runs on http://localhost:5173 🎨
__________________________________________

📦 Production Build

🎨 Frontend:
cd Frontend
npm run build
npm run preview

🖥️ Backend:
cd Backend
npm start

__________________________________________

🔌### API Endpoints 
🔐 Authentication Routes (/api/auth)

🔑## POST /signup
✍️ Create new user
🔓 No Authentication Required


🔑## POST /signin
🔓 Login user
🔓 No Authentication Required

👤## GET /me
📋 Get current user
🔐 Authentication Required

🚪## POST /signout
👋 Logout user
🔐 Authentication Required

___________________________________________

🔗### URL Routes (/api/create)

➕## POST /
🔗 Create short URL
🔓 No Authentication Required

✏️## POST /user
🎯 Create short URL with custom alias
🔐 Authentication Required
___________________________________________

👤### User Routes (/api/user)

🗑️## POST /delete-urls
❌ Delete a specific URL
🔐 Authentication Required

📋## GET /get-urls
📊 Get all user's created URLs
🔐 Authentication Required

___________________________________________

🔄## Redirect Route

🌐 GET /:id
🔗 Redirect to original URL
🔓 No Authentication Required

___________________________________________

💻 Usage
📝 Create an Account
    🌐 Navigate to http://localhost:5173/auth
    👆 Click "Sign Up"
    ✍️ Fill in your details and create account
    🔑 Sign in with your credentials

🔗 Create a Short URL
    📊 Go to Dashboard
    🔗 Enter your long URL
    ⚙️ (Optional) Enable custom URL and enter your custom short code
    ➕ Click "Create Short URL"
    📋 Copy the generated link

📈 View Analytics
    📊 All created URLs are displayed in the URLs list
    👀 See click count and creation date for each URL
    🔄 Click the refresh button to update data

🚪 Logout
    Click the "Logout" button in the navbar 👋

___________________________________________

🌐### Deployment

🎨 Frontend Deployment (Vercel)
cd Frontend
npm run build

Deploy the dist folder to Vercel. The vercel.json handles SPA routing. ✨

🖥️ Backend Deployment (Render/Heroku)
    📤 Push code to GitHub
    🔗 Connect repository to Render/Heroku
    ⚙️ Set environment variables in dashboard
    🚀 Deploy

Update VITE_API_URL in frontend to match your deployed backend URL. 🌐

___________________________________________

📝 License
This project is open source and available under the ISC License. 📄

👤 Author
🔗 Oorly URL Shortener App - A simple and elegant URL shortening solution. ✨

🤝 Contributing
Contributions are welcome! 🎉 Feel free to fork and submit pull requests. 💪

___________________________________________

🎯 Quick Start Checklist
    ✅ Clone the repository
    ✅ Install dependencies (Frontend & Backend)
    ✅ Setup .env files
    ✅ Run npm run dev in both directories
    ✅ Access frontend at http://localhost:5173
    ✅ Start shortening URLs! 🎉

___________________________________________
Happy URL Shortening! 🚀