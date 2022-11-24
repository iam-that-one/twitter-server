import express from 'express'
import { like, getLikers, unlike } from '../controllers/likes.js';

const likeRouter = express.Router();
likeRouter.post("/",like)
likeRouter.get("/",getLikers)
likeRouter.delete("/:id",unlike)

export default likeRouter;