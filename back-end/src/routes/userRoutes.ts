import { Router } from 'express';
import userController from '../controllers/userController';
import checkToken from '../middleware/check-Token';

const userRouter = Router();

userRouter.get('/show/:id', checkToken, userController.ShowUser);
userRouter.post('/create', userController.postUser);
userRouter.post('/login', checkToken, userController.login);
userRouter.patch('/update/:id', checkToken, userController.Update);

export default userRouter;