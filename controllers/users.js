import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import TweetModel from "../models/tweetModel.js";
import FollowModel from "../models/followModel.js";
let hashedPassword = ''
const SignUp = async (req, res) => {
    const user = req.body
    hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new UserModel({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        dateOfBirth: user.dateOfBirth,
        avatar:req.file?.path || 'uploads/person.webp'
    });
    UserModel.findOne({ email: user.email }, (error, user) => {
        if (user) {
            res.send({ message: `user ${user.email} already exist` })
        } else {
            newUser.save((err, user) => {
                if (user) {
                    let verified = true
                     res.send({verified:verified, message: "User has been created succesfully", currentUser: { id: user._id, name: user.name } })
                }
            })
        }
    })
}

const SignIn = async (request, response) => {
    const user = request.body
    const { email, password } = user
      UserModel.findOne({ email: email })
        .then(async user => {
            if (!user) {
                return response.send({ message: `User with email:  ${request.body.email} does not exist!!` })
            } else if (user) {
                let verified = await bcrypt.compare(password, user.password)
                if (verified) {
                    return response.send({ verified: verified, message: `You have signed in succesfully`, currentUser: { id: user._id, name: user.name, avatar: user.avatar, bio: user.bio, site: user.site }, isLoggedIn: user ? true : false })
                } else {
                    return response.send({ message: "Password does not match" })
                }
            }
        })
}


const getUsers = (request, response) => {
    UserModel.find((err, users) => {
        response.send(users)
    })
}

const updateUser = async (request, response) => {
    const { id } = request.params
    const updatedUserProfile = {
        name: request.body.name,
        bio: request.body.bio,
        site: request.body.site
    }
    const options = { new: true }
    try {
        const result = await UserModel.findByIdAndUpdate(id, updatedUserProfile, options)
        response.send({ result: result, message: `${id} Updated` })
        console.log(`${id} Updated`)
        console.log(request.body.name)
    } catch (error) {
        console.log(error)
    }
}

const deleteAccount = async (request, response) => {
     const {id} = request.params
     await UserModel.findByIdAndDelete(id)
       .then( async account=>{
           if(!account){
               await TweetModel.deleteMany({userId : id})
                   .then(async account =>{    
                      await  FollowModel.deleteMany({followerId: id})
                   })
                   
                    response.send(`Account has been deleted Successfully.`)
            }else{
                response.send("Something went wrong while deleting the account.")
            }
    }    
    )


    //     if(!user){
    //        TweetModel.deleteMany({userId : id})
    //        .then(()=>{
    //            FollowModel.deleteMany({followerId: id, followedId: id})
    //        })
    //        response.send("User has been deleted Successfully.")
    //     }
    // )
    
}

export { SignUp, SignIn, getUsers, updateUser, deleteAccount }