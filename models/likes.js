import mongoose from "mongoose";

const LILES_SCHEMA = new mongoose.Schema({
    likerId:{
        type: String,
        require: true
    },
    tweetId:{
        type: String,
        require: true
    }
})

const LikesModel = mongoose.model("likes", LILES_SCHEMA)

export default LikesModel;