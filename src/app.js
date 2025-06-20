import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get("/api/health", (req, res) => res.send("API is running"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Global error handler
// app.use(errorHandler);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

export default app;
