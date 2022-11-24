import express from 'express'
import { follow, getFollowers,unfollow} from '../controllers/followers.js';

const followRouter = express.Router();
followRouter.post("/",follow)
followRouter.get("/",getFollowers)
followRouter.delete("/:id",unfollow)

export default followRouter;