import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import { app, server } from "./socket/socket.js";

import connectDB from "./db/connection.js";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import userRoutes from "./routes/user.routes.js";

const port = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

// Health-Check route

app.get("/health", (_req, res) => {
  res.status(200).send("Server is running");
});

server.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
