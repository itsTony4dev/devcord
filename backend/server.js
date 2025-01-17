import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);

// Health-Check route

app.get("/health", (_req, res) => {
  res.status(200).send("Server is running");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
