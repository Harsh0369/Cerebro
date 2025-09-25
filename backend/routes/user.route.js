import { Router } from "express";
import * as userController from '../controllers/user.controller.js';

const router = Router();


router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);

export const userRoutes = router;