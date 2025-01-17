import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import User from "../models/User.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const newConversation = await Conversation.create({
        members: [senderId, receiverId],
      });
      conversation = newConversation;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    await Conversation.findByIdAndUpdate(
      conversation._id,
      {
        $push: { messages: newMessage._id },
      },
      { new: true }
    );
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json("Internal Server Error");
  }
};
