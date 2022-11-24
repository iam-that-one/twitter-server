import mongoose from "mongoose";

const COMMENT_SCHEMA = new mongoose.Schema({
    comment:{
        type: String,
        require: false
    },
    commenterId:{
        type: String,
        require: false
    },
    tweetId:{
        type: String,
        require: false
    },
    date:{
        type: String,
        require: false
    }
})

const CommentModel = mongoose.model("comments", COMMENT_SCHEMA)

export default CommentModel;