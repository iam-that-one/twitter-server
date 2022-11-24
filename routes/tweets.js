import express from 'express'
import { createTweet, deleteTweet, getTweet, getTweets,updateTweet } from '../controllers/tweets.js';
import { uploadTweet } from '../middelware/uploadTweet.js';
const tweetRouter = express.Router();
const retweetRouter = express.Router();

tweetRouter.post("/",uploadTweet.array('image[]'),createTweet)
retweetRouter.post("/",createTweet)
tweetRouter.get("/",getTweets)
tweetRouter.patch("/:id",updateTweet)
tweetRouter.delete("/:id",deleteTweet)
tweetRouter.get("/:id", getTweet)

export {tweetRouter,retweetRouter}