import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    },
    dateOfBirth: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: false
    },
    site: {
        type: String,
        require: false
    }
});

const UserModel = mongoose.model("users", UserSchema)

export default UserModel;