import { Router } from 'express';
import userController from '../controllers/userController';
import checkToken from '../middleware/check-Token';

const userRouter = Router();

userRouter.post('/create', userController.postUser);
userRouter.post('/login', checkToken, userController.login);

export default userRouter;