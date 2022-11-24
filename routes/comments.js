import express from 'express'
import { postComment, getComment} from '../controllers/comments.js';

const commentsRouter = express.Router();
commentsRouter.post("/",postComment)
commentsRouter.get("/",getComment)

export default commentsRouter;