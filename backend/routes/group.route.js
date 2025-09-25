import { Router } from "express";
import * as groupController from '../controllers/group.controller.js';
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', isAuthenticated, groupController.createGroup);
router.post('/join/:id', isAuthenticated, groupController.joinGroup);
router.post('/join/private/:id', isAuthenticated, groupController.joinPrivateGroup);
router.get('/', isAuthenticated, groupController.getAllGroups);
router.get('/:id', isAuthenticated, groupController.getGroupById);
router.put('/:id', isAuthenticated, groupController.leaveGroup);
router.delete('/:id', isAuthenticated, groupController.removeUser);

export const groupRoutes = router;
