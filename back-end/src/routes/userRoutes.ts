import { Router } from 'express';
import userController from '../controllers/userController';
import checkToken from '../middleware/check-Token';
import multer from 'multer';
import { ConfigUploadImage }from '../helpers/Image-update';


const imageUpload = multer(ConfigUploadImage );

const userRouter = Router();

userRouter.get('/show/:id', checkToken, userController.ShowUser);
userRouter.post('/create', imageUpload.single('image'),userController.postUser);
userRouter.post('/login', userController.login);
userRouter.patch('/update/:id', checkToken, userController.Update);
userRouter.delete('/delete/:id', checkToken, userController.Delete);

export default userRouter;