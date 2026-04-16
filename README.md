# DrivalTech Frontend

## 📦 Overview

Frontend application for the DrivalTech Finance system, built with React and Vite.

## 🚀 Features

- User authentication with JWT
- Login integration with backend API
- Protected routes
- Axios client with automatic token injection

## 🛠️ Tech Stack

- React
- Vite
- Axios
- React Router

## ⚙️ Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Run the application

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

## 🔗 Backend

Make sure the backend is running at:

```bash
http://localhost:8080
```

## 🔐 Authentication Flow

1. User logs in via `/auth/login`
2. Backend returns JWT token
3. Token is stored in localStorage
4. Axios sends token in every request
5. Protected routes restrict access

## 🚀 Next Steps

- Dashboard integration
- Transactions listing
- Data visualization
