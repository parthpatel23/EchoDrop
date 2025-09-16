# EchoDrop - Multi-Platform Scheduled Messaging System

A full-stack web application (Angular & Node.js) that allows users to schedule messages to be sent via Email, SMS, and WhatsApp at a specified time.

## 🚀 Features

- **User Authentication:** JWT-based login and Google OAuth 2.0
- **Message Scheduling:** Intuitive UI to schedule messages for future delivery
- **Multi-Platform Support:** Send messages via Email (Gmail API), SMS, and WhatsApp (Twilio API)
- **Real-Time Tracking:** View status of messages (Pending, Processing, Sent, Failed)
- **Responsive Dashboard:** Modern Angular UI built with Bootstrap

## 🛠️ Tech Stack

- **Frontend:** Angular 17, TypeScript, Bootstrap, RxJS
- **Backend:** Node.js, Express.js, JWT, Passport.js
- **Database:** MongoDB with Mongoose ODM
- **APIs:** Twilio API (SMS/WhatsApp), Gmail API

## 📦 Project Structure
EchoDrop-Project/
├── backend/ # Node.js + Express API server
├── frontend-angular/ # Angular web application
└── documentation/ # Project presentation and docs


## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (`npm install -g @angular/cli`)
- MongoDB Atlas account or local MongoDB instance
- Twilio account
- Google Cloud Platform account with Gmail API enabled

### Backend Setup
1. Navigate to the `backend` folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example` and configure your variables:
   `PORT=5000`
   `MONGO_URI=your_mongodb_connection_string`
   `JWT_SECRET=your_jwt_secret`
   `TWILIO_ACCOUNT_SID=your_twilio_sid`
   `TWILIO_AUTH_TOKEN=your_twilio_token`
   `TWILIO_PHONE=your_twilio_phone`
   `GOOGLE_CLIENT_ID=your_google_client_id`
   `GOOGLE_CLIENT_SECRET=your_google_secret`
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the `frontend-angular` folder: `cd frontend-angular`
2. Install dependencies: `npm install`
3. Start the development server: `ng serve`
4. Open http://localhost:4200 in your browser

## 🔐 Important Note on API Limitations

This is a **prototype** developed for academic purposes:
- Google OAuth is configured for test users only
- Twilio trial account limits messages to pre-verified numbers only
- The application runs in a local development environment

## 📝 License

This project is created for academic purposes.

## 👨‍💻 Developer

**Parth Dilipbhai Patel**  
