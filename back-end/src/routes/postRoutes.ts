import { Router } from 'express';
import { PostController } from '../controllers/postController';
import checkToken from '../middleware/check-Token';
import { ConfigUploadImage } from '../helpers/Image-update';
import multer from 'multer';

const postRouter = Router();

const upload = multer(ConfigUploadImage);

postRouter.get('/allpost', checkToken, PostController.getAllPost);
postRouter.get('/:id', checkToken, PostController.getPost);
postRouter.get('/myposts/:id', checkToken, PostController.getMyPost);
postRouter.post('/posted', checkToken,upload.single('image'),PostController.postedPost);
postRouter.patch('/edit/:postId', checkToken, upload.single('image'),PostController.PostUpdate);
postRouter.delete('/delete/:postid', checkToken, PostController.DeletePost);

export default postRouter;