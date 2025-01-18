import express from "express";

import { getConversation, sendMessage } from "../controller/chat.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.route("/send/:id").post(protectRoute, sendMessage);
router.route("/:id").get(protectRoute, getConversation);

export default router;
