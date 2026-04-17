# DrivalTech Frontend

## Overview

Frontend application for the DrivalTech Finance system, built with React and Vite.

## Features

- User authentication with JWT
- Login and logout flow
- Protected routes
- Axios client with automatic token injection
- Dashboard integration with backend API
- Display of financial summary (income, expense, balance)
- Currency formatting (BRL)
- Basic UI with responsive dashboard cards

## Tech Stack

- React
- Vite
- Axios
- React Router

## Running the Project

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

## Backend

Make sure the backend is running at:

```bash
http://localhost:8080
```

## Authentication Flow

1. User logs in via `/auth/login`
2. Backend returns JWT token
3. Token is stored in localStorage
4. Axios sends token in every request
5. Protected routes restrict access

## Dashboard

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

This ensures real-time integration between frontend and backend.

## Next Steps

- Transactions listing (CRUD + filters)
- UI improvements (loading, error handling)
- Charts and data visualization
- Global state management (Context API)
