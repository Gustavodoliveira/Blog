import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/create', userController.postUser);

export default userRouter;