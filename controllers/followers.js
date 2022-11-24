import FollowModel from "../models/followModel.js"

const follow = (request,response) =>{
   const followReq = new FollowModel({
    followerId: request.body.followerId,
    followedId: request.body.followedId
   })

   followReq.save()
   .catch(err =>{
       if(err){
       return response.send(err)
    }else{
        return response.send("Done")
    }

   });
}

const unfollow = async (request,response) =>{
    const { id } = request.params
    console.log(id)
    await FollowModel.findByIdAndDelete(id)
    .then((follow)=>{
        if(!follow){
            return response.send({
                message: "We found that you did not follow this user"
            })
        }
        response.send({
            message: "user has been unfollowed"
        })
        console.log(`user has been unfollowed`)
    })
    .catch((err)=>{
        return response.send({
            message: err
        })
    })
}



const getFollowers = (request,response) =>{
    FollowModel.find((err,followings)=>{
        response.send(followings)
    })
}



export {follow,getFollowers,unfollow}