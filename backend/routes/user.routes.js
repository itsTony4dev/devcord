import express from "express";
import { getUsersForSidebar } from "../controller/user.controller.js";

import {protectRoute} from "../middleware/protectRoute.js";

const router = express.Router();

router.route("/").get( getUsersForSidebar);

export default router;