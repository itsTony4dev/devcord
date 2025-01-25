import User from "../models/User.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const filteredUsers = await User.find().select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
