import mongoose from "mongoose"
const FOLLOW_SCHEMA = new mongoose.Schema({
    followerId:{
        type: String,
        require: true
    },
    followedId:{
        type: String,
        require: true
    }
}) 

const FollowModel = mongoose.model("followers", FOLLOW_SCHEMA)
export default FollowModel;