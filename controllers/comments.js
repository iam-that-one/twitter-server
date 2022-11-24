import CommentModel from "../models/commentsModel.js"

const postComment = (request,response) =>{
const comment = request.body

const newComment = new CommentModel({
    comment: comment.comment,
    commenterId: comment.commenterId,
    tweetId: comment.tweetId,
    date: comment.date
})
newComment.save()
     .catch(err =>{
         console.log("#########",err)
         return response.send(err)

     });
     response.send(newComment)
}

const getComment = (request,response) =>{
    CommentModel.find((err,comments)=>{
        response.send(comments)
    })
  
}

export{postComment,getComment}