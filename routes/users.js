import express from 'express'
import { SignUp,SignIn,getUsers, updateUser, deleteAccount } from '../controllers/users.js';
import {upload} from '../middelware/upload.js'
const userRoute = express.Router();
const signinRoute = express.Router();
const signUpRoute = express.Router();


signUpRoute.post("/",upload.single("avatar") || null,SignUp);
userRoute.get("/", getUsers)
userRoute.patch("/:id",updateUser)
signinRoute.post("/",SignIn);
userRoute.delete("/:id", deleteAccount)

export {userRoute,signinRoute,signUpRoute}