import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: [true, "Please enter your first name"],
      min: 3,
      max: 20,
    },
    lName: {
      type: String,
      required: [true, "Please enter your last name"],
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      min: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
