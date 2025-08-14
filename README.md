# Chittagong University Shuttle Train Booking System

## Project Overview
This is a web application for booking shuttle train tickets between Chittagong University and nearby stations (BotToli and Sholoshahar). The system allows users to:
- Search available shuttle trains
- Book tickets
- View booking history
- Make online payments

## Technologies Used
- **Frontend**: React.js, React Router, react-toastify
- **Backend**: Node.js, Express.js, MongoDB
- **Payment Gateway**: SSLCommerz (for Bangladeshi payments)

## Prerequisites
- Node.js (v14 or later)
- MongoDB (local or Atlas)
- SSLCommerz merchant account (for payment integration)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cu-shuttle-booking.git
cd cu-shuttle-booking
```

### 2. Install Dependencies
For both backend and frontend:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Environment Configuration

#### Backend (.env)
Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/cu-shuttle
JWT_SECRET=your_jwt_secret_key
PORT=8080
SSLCOMMERZ_STORE_ID=your_sslcommerz_id
SSLCOMMERZ_STORE_PASSWD=your_sslcommerz_password
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8080
```

#### Frontend (.env)
Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080
```

### 4. Database Setup
1. Ensure MongoDB is running
2. Seed the initial train data:
```bash
cd backend
node seedTrains.js
```

### 5. Run the Application

#### Start Backend Server:
```bash
cd backend
npm start
```

#### Start Frontend Development Server:
```bash
cd frontend
npm start
```

## Project Structure

```
cu-shuttle-booking/
├── backend/
│   ├── controllers/       # Business logic
│   ├── middlewares/       # Authentication & validation
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── seedTrains.js      # Train schedule seeder
│   └── server.js          # Express server setup
│
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Application pages
│   │   ├── utils/         # API calls and utilities
│   │   └── App.js         # Main application router
│   └── package.json
│
└── README.md
```

## Features

### User Features
- User registration and login
- Train schedule viewing
- Ticket booking with multiple passengers
- Online payment integration
- Booking history tracking

### Admin Features
- Train schedule management
- Booking management
- User management

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/signup` | POST | User registration |
| `/auth/login` | POST | User login |
| `/trains/search` | GET | Search available trains |
| `/bookings` | POST | Create new booking |
| `/bookings` | GET | Get user bookings |
| `/payments/init` | POST | Initialize payment |
| `/payments/validate` | POST | Validate payment |

## Payment Integration
The system uses SSLCommerz for payment processing. To enable payments:
1. Register for an SSLCommerz merchant account
2. Update the store ID and password in backend `.env`
3. Configure success/fail/callback URLs

## Testing
To run tests:
```bash
cd backend && npm test
cd ../frontend && npm test
```

## Deployment

### Backend Deployment
1. Set up a Node.js hosting environment (e.g., Heroku, AWS, DigitalOcean)
2. Configure production MongoDB connection
3. Update environment variables

### Frontend Deployment
1. Build production version:
```bash
cd frontend && npm run build
```
2. Deploy to static hosting (e.g., Netlify, Vercel, AWS S3)