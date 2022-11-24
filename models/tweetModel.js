import mongoose from "mongoose";

const TWEET_SCHEMA = new mongoose.Schema({
    tweet: {
        type : String,
        required: false,
    },
    image:{
        type: String,
        require: true
    },
    date: {
        type: String,
        require: false
    },
    mediaType: {
       type: String,
       require: true,
       default:'photo'
    },
    device: {
        type : String,
        required: true,
    },
    userId: {
        type : String,
        required: true,
    },
    // Retweet Extension
    tweetType: {
        type: String,
        required : false
    },
    originalUserId: {
        type: String,
        required : false
    },
    originalTweetId: {
        type: String,
        required : false
    },
    originalDevice: {
        type: String,
        required : false
    }

})

const TweetModel = mongoose.model("tweets", TWEET_SCHEMA)

export default TweetModel;