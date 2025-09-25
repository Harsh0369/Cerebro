import { Router } from "express";
import * as userController from '../controllers/user.controller.js';

const router = Router();


router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.put('/', userController.updateProfile);
router.post('/avatar', userController.uploadAvatar);

export const userRoutes = router;