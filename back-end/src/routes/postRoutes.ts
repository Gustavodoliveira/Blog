import { Router } from 'express';
import { PostController } from '../controllers/postController';
import checkToken from '../middleware/check-Token';

const postRouter = Router();


postRouter.get('/posted', checkToken,PostController.postedPost);

export default postRouter;