// AngularApp\echodrop\backend\src\index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";

dotenv.config();

// Import configs
import "./config/passport.js";
import "../scheduler.js";

// Routes
import authRoutes from "./routes/auth.js";
import messagesRoutes from "./routes/messages.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: false
}));
app.use(passport.initialize());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/auth", authRoutes);
app.use("/messages", messagesRoutes);

// Health route
app.get("/", (req, res) => res.json({ ok: true, timestamp: Date.now() }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend listening on ${PORT}`));
