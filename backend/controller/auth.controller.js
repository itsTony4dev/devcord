import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import transporter from "../utils/transporter.js";
import jwt from "jsonwebtoken";
import generateEmailVerification from "../utils/generateEmailVerification.js";

export const signup = async (req, res) => {
  try {
    const { fName, lName, username, password, confirmPassword, email } =
      req.body;
    if (
      fName.trim() == "" ||
      lName.trim() == "" ||
      username.trim() == "" ||
      password.trim() == "" ||
      confirmPassword.trim() == "" ||
      email.trim() == ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username must be unique" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    const user = await User.create({
      fName,
      lName,
      username,
      password: hashedPassword,
      email,
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Something went wrong! Please try again later." });
    }
    //Email verification process
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    const url = `http://${process.env.HOST}:${process.env.PORT}/api/auth/verify/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: generateEmailVerification(username, url),
    });

    res.status(201).json({
      message: "Registration successful. Check your email for verification.",
    });
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername.trim()) {
      return res.status(400).json({ message: "Email or username is required" });
    }
    if (!password.trim()) {
      return res.status(400).json({ message: "Password is required" });
    }
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      message: "User signed in successfully",
      data: {
        fName: user.fName,
        lName: user.lName,
        username: user.username,
        email: user.email,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.log("Error in signin controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signout = (_req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    console.log("Error in signout controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.log("Error in verifyEmail controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email.trim()) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const url = `http://localhost:8000/api/auth/verify/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: generateEmailVerification(user.username, url),
    });
    res.status(200).json({
      message: "A verification has been sent to your email",
    });
  } catch (error) {
    console.log("Error in resendVerificationEmail controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
