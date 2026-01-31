# 🚀 EchoDrop – Scheduled Messaging Platform

EchoDrop is a **full-stack web application** that allows users to schedule and send messages automatically using third-party services like **Twilio** and **Email APIs**.
It is built with a **modern Angular frontend** and a **Node.js + Express backend**, following real-world project architecture and security practices.

🔹 Designed to demonstrate **real-world full-stack development**, authentication, API integration, and task scheduling.

---

## 🧠 Problem Statement

Many users need to send reminders, alerts, or important messages at a **specific future time** without manual effort.
EchoDrop solves this by providing a **secure, automated scheduled messaging system** with authentication and third-party API integration.

---

## ✨ Features

- 🔐 **User authentication (JWT)**
  - Email/password registration and login
  - Protected routes on both backend and Angular frontend

- ⏰ **Schedule messages for future delivery**
  - Store scheduled messages in MongoDB with platform, recipient, content, and time
  - Support for different channels: Email, SMS, WhatsApp

- 📩 **Multi-channel delivery**
  - **Email via Gmail API (OAuth2)**  
    - Uses the Gmail API with OAuth2 to send emails from a linked Google account
  - **SMS & WhatsApp via Twilio (Trial / Sandbox Mode)**  
    - Real integration with Twilio SDK  
    - Messages are successfully sent to Twilio‑verified / sandbox numbers  
    - See “Limitations” below for details

- 🧑‍💻 **User-friendly dashboard (Angular)**
  - Login / signup screens
  - Dashboard with upcoming and past scheduled messages
  - Forms to create and manage scheduled messages (“drops”)

- 🌐 **RESTful API architecture**
  - Clean separation between frontend (Angular SPA) and backend (Express API)
  - JWT-based auth middleware to protect API routes

- 🔒 **Secure backend configuration**
  - Sensitive credentials in `.env` (not committed)
  - Separate config for auth, services (Gmail, Twilio), and scheduler

---

## ⏱ Scheduling Logic

Messages are stored with scheduled timestamps in MongoDB using models like `ScheduledMessage` and `Drop`.

A backend job (see `backend/scheduler.js`) periodically:

1. Finds pending messages whose scheduled time is due.
2. Determines the correct platform (`email`, `sms`, or `whatsapp`).
3. Calls the unified `sendMessage` service (`backend/src/services/sendMessage.js`), which:
   - For **email**: uses the Gmail API with per-user OAuth2 refresh tokens.
   - For **SMS**: uses the Twilio SMS API.
   - For **WhatsApp**: uses Twilio’s WhatsApp API (sandbox).

The job then updates the message’s status and logs a `MessageLog` entry for auditing.

---

## 🛠 Tech Stack

### Frontend

* Angular
* TypeScript
* HTML5, CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### APIs & Tools

* **Gmail API (OAuth2)** – Email delivery via Google
* **Twilio API** – SMS & WhatsApp (trial / sandbox mode)
* Passport.js (for auth configuration)
* Git & GitHub

---

## 📁 Project Structure

```text
EchoDrop/
├── backend/                     # Node.js + Express backend
│   ├── src/
│   │   ├── config/
│   │   │   └── passport.js      # Authentication configuration
│   │   │
│   │   ├── controllers/         # Request handlers
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.js          # Authentication middleware
│   │   │
│   │   ├── models/              # Database models
│   │   │   ├── User.js
│   │   │   ├── Drop.js
│   │   │   ├── MessageLog.js
│   │   │   ├── ScheduledMessage.js
│   │   │   └── list-users.js
│   │   │
│   │   ├── routes/              # API routes
│   │   │   ├── auth.js
│   │   │   ├── messages.js
│   │   │   └── messageRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── sendMessage.js   # Email / SMS delivery logic
│   │   │
│   │   ├── utils/
│   │   │   └── twilio.js        # Twilio helper
│   │   │
│   │   └── index.js             # Backend entry point
│   │
│   ├── server.js                # Server bootstrap
│   ├── scheduler.js             # Message scheduling logic
│   ├── generate-token.js        # Token generation utility
│   ├── package.json
│   └── package-lock.json
│
├── frontend-angular/             # Angular frontend
│   ├── public/
│   │   ├── EchoDrop.ico
│   │   └── favicon.ico
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/             # Login & signup components
│   │   │   ├── dashboard/        # Dashboard UI
│   │   │   ├── messages/
│   │   │   │   ├── messages-list/
│   │   │   │   └── schedule-message/
│   │   │   ├── navbar/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts
│   │   │   ├── services/
│   │   │   │   └── auth.service.ts
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.component.ts
│   │   │   └── auth.interceptor.ts
│   │   │
│   │   ├── assets/              # Static assets
│   │   ├── main.ts
│   │   ├── index.html
│   │   └── styles.scss
│   │
│   ├── angular.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/parthpatel23/EchoDrop.git
cd EchoDrop
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file `in backend/` (you can refer to `.env.example`):

```env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

# Gmail OAuth2 (used for sending email via Gmail API)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REFRESH_TOKEN=optional_global_refresh_token
GOOGLE_REDIRECT_URI=your_redirect_url

# Email "from" address (if needed)
EMAIL_USER=your_email

# Twilio (trial / sandbox)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_SMS_PHONE=your_twilio_sms_number           # e.g. +1xxxxxxxxxx
TWILIO_WHATSAPP_PHONE=your_twilio_whatsapp_number # e.g. +1xxxxxxxxxx (sandbox)
```

Run backend:

```bash
npm start
```

The backend server will typically run at:

```text
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

⚠️ Make sure the backend server is running before starting the frontend.

```bash
cd frontend-angular
npm install
ng serve
```

Open in browser:

```text
http://localhost:4200
```

---

## 🖼 Screenshots

### Login Page
<img width="1919" height="967" alt="Screenshot 2025-09-13 231456" src="https://github.com/user-attachments/assets/826e0b90-c922-472b-8821-577689bc1d17" />

### Dashboard
<img width="1916" height="970" alt="Screenshot 2025-09-13 233520" src="https://github.com/user-attachments/assets/74ff90f9-fb8c-4694-9cb1-9d24ac296d61" />

### Schedule Message
<img width="1919" height="972" alt="Screenshot 2025-09-13 234840" src="https://github.com/user-attachments/assets/6fc4cef0-47b2-4fb0-8f78-bb7b52102b65" />

---

## 🔒 Environment Variables

Sensitive credentials are managed using `.env` files and are not committed to the repository.

📌 A `.env.example` file is provided to help contributors configure the project safely.

You must configure:
* MONGO_URI – MongoDB connection string
* JWT_SECRET – secret for signing JWT tokens
* Gmail OAuth credentials for email sending
* Twilio account credentials and phone numbers

---

## 📌 Current Limitations

Because EchoDrop is built using free / trial services:
- Twilio (SMS & WhatsApp)
  - The Twilio account is in trial / sandbox mode.
  - SMS messages are only delivered to phone numbers verified in the Twilio console.
  - WhatsApp messages are only delivered to numbers that have joined the Twilio sandbox.
  - This is a restriction of Twilio trial, not of the EchoDrop code.

- Email via Gmail
  - Requires correct Gmail OAuth2 configuration.
  - For per-user sending, each user must link their Google account to provide a refresh token.

In a production deployment with upgraded accounts, the same code can send to any valid user email/phone numbers.

---

## 📚 What I Learned

* Implementing JWT-based authentication and protecting routes
* Integrating third-party APIs (Gmail, Twilio) securely
* Designing scalable backend architecture with controllers, services, and middleware
* Handling scheduled background tasks and delayed message delivery
* Building an Angular SPA that talks to a REST API
* Managing environment variables and application security in a full-stack project

---

## 🚀 Future Improvements

* 📱 Mobile responsiveness and improved UI/UX
* 📊 Message delivery analytics & dashboards
* 🔔 Push notifications (e.g. Web Push / FCM)
* 💬 Additional free channels (e.g. Telegram bot integration)
* 🧪 Unit & integration tests for both backend and frontend
* 🌍 Deployment (e.g. Render / Railway for backend, Vercel / Netlify for frontend)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Submit a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Parth Patel**
* 🎓 Bachelor of Computer Applications (BCA)
* 🔗 GitHub: [https://github.com/parthpatel23](https://github.com/parthpatel23)
