import { Router } from "express";
import * as messageController from '../controllers/message.controller.js';
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/:groupId/messages', isAuthenticated, messageController.getMessages);

export const messageRoutes = router;
