import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import { getReceiverSockerId } from "../socket/socket.js";
import { io } from "../socket/socket.js";

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

    const receiverSocketId = getReceiverSockerId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json("Internal Server Error");
  }
};

export const getConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json("Internal Server Error");
  }
};
