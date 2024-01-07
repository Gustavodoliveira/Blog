import { Router } from 'express';
import { PostController } from '../controllers/postController';
import checkToken from '../middleware/check-Token';
import { ConfigPostUploadImage } from '../helpers/Image-update';
import multer from 'multer';

const postRouter = Router();

const upload = multer(ConfigPostUploadImage);

postRouter.get('/allpost', checkToken, PostController.getAllPost);
postRouter.get('/posts/:categoric', checkToken, PostController.getPostCategoric);
postRouter.get('/myposts', checkToken, PostController.getMyPost);
postRouter.post('/posted', checkToken,upload.array('image'),PostController.postedPost);
postRouter.patch('/edit/:postId', checkToken, upload.array('image'),PostController.PostUpdate);
postRouter.delete('/delete/:id', checkToken, PostController.DeletePost);

export default postRouter;