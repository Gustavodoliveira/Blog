import { Router } from 'express';
import { PostController } from '../controllers/postController';
import checkToken from '../middleware/check-Token';
import { ConfigPostUploadImage } from '../helpers/Image-update';
import multer from 'multer';

const postRouter = Router();

const upload = multer(ConfigPostUploadImage);

postRouter.get('/posted', checkToken,upload.array('image', 3),PostController.postedPost);

export default postRouter;