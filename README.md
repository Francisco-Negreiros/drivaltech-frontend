# DrivalTech Frontend

## Overview

Frontend application for the DrivalTech Finance system, built with React and Vite.

This application provides a complete financial management interface, including authentication, dashboard visualization, and full transaction management.

---

## 🚀 Features

### 🔐 Authentication

- User authentication with JWT
- Login and logout flow
- Protected routes
- Axios client with automatic token injection

### 📊 Dashboard

- Integration with backend API
- Display of financial summary (income, expense, balance)
- Currency formatting (BRL)

### 💰 Transactions (CRUD)

- List all transactions
- Create new transaction
- Edit existing transaction
- Delete transaction
- Associate transactions with categories
- Category selection via dropdown

---

## 🧠 Tech Stack

- React
- Vite
- Axios
- React Router

---

## ▶️ Running the Project

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

---

## 🔗 Backend

Make sure the backend is running at:

```bash
http://localhost:8080
```

---

## 🔐 Authentication Flow (Frontend)

The frontend now includes a complete authentication system:

- Login page integrated with backend
- JWT token stored in localStorage
- Global authentication state using Context API
- Protected routes (Dashboard and Transactions)
- Automatic redirection after login/logout
- Navbar with navigation and logout

This removes the need for manual authentication via Postman and enables real user interaction.

---

## 📊 Dashboard

The dashboard displays real financial data fetched from the backend API.

### Endpoint used

```http
GET /dashboard/summary
```

### Data displayed

- Income
- Expense
- Balance

### Behavior

- Data is loaded on page mount
- Values are formatted to Brazilian currency (BRL)
- Requires authentication (JWT)

---

## 💰 Transactions Module

The Transactions module allows full financial management through a complete CRUD interface.

### ✨ Features

- List all transactions in a table
- Create new transaction via form
- Edit existing transactions
- Delete transactions
- Associate transactions with categories

### 🔄 API Integration

The frontend consumes the following endpoints:

```http
GET /transactions
POST /transactions
PUT /transactions/{id}
DELETE /transactions/{id}
GET /categories
```

### 📊 Data Handling

- Supports paginated API responses
- Extracts data from `response.data.data`
- Handles empty states and errors gracefully

### 🎨 UI Features

- Table-based layout
- Conditional styling (INCOME / EXPENSE)
- Currency formatting (BRL)
- Date formatting (DD/MM/YYYY)
- Dynamic form (create/edit mode)

---

## 🚀 Current Status

- ✅ Auth Flow (Frontend) — COMPLETED
- ✅ Transactions CRUD — COMPLETED
- ✅ Dashboard Integration — COMPLETED

---

## 🚀 Next Steps

- Navigation improvements (UI/UX)
- Categories CRUD
- User management (roles and permissions)
- Global state improvements

---
