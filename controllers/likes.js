import LikesModel from "../models/likes.js";

const like = (request,response) =>{
   const likeReq = new LikesModel({
    likerId: request.body.likerId,
    tweetId: request.body.tweetId
   })

   likeReq.save()
   .catch(err =>{
       if(err){
       return response.send(err)
    }else{
        return response.send("Done")
    }

   });
}

const unlike = async (request,response) =>{
    const { id } = request.params
    console.log("deleteID",id)
    await LikesModel.findByIdAndDelete(id)
    .then((like)=>{
        if(!like){
            return response.send({
                message: "this tweet not exist"
            })
        }
        response.send({
            message: "you have unliked it"
        })
        console.log(`you have unliked it`)
    })
    .catch((err)=>{
        return response.send({
            message: err
        })
    })
}



const getLikers = (request,response) =>{
    LikesModel.find((err,likes)=>{
        response.send(likes)
    })
}



export {like,getLikers,unlike}