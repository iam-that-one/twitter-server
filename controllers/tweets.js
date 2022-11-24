import TweetModel from "../models/tweetModel.js";
const createTweet = (req, res) =>{
    const tweet = req.body
    const newTweet =  new TweetModel({
        tweet  : tweet.tweet,
        date   : tweet.date,
        device : tweet.device,
        userId : tweet.userId,
        image : tweet.image,
        // Retweet Extension
        tweetType : tweet.tweetType,
        originalUserId: tweet.originalUserId,
        originalTweetId: tweet.originalTweetId

    });
   
        if(tweet.tweetType !== 'retweet'){
            if(req.files){
                let path = ''
                req.files.forEach((files,index,arr) => {
                    path = path + files.path + ','
                });
                path = path.substring(0,path.lastIndexOf(","))
        newTweet.image = path
        }else{
            newTweet.image = tweet.image
        }
    }
    newTweet.save()
     .catch(err =>{
         console.log("#########",err)
         return res.send(err)

     });

    return res.send({message: "Tweet has been created succesfully", tweet: newTweet})
}

const getTweets = (request, response) =>{
    TweetModel.find((err,tweets)=>{
        response.send(tweets)
    })
  
}


const updateTweet = async (request, response) =>{
    const { id } = request.params

    const updatedTweet = {
      tweet: request.body.tweet
     }

   const options = {new : true}
   try{
   const result = await TweetModel.findByIdAndUpdate(id,updatedTweet,options)
   response.send({result:result, message: `${id} Updated`})
   console.log(`${id} Updated`)
   console.log(request.body.tweet)
   }catch (error){
       console.log(error)
   }
}

const getTweet = async (request, response) =>{
     const { id } = request.params

   await TweetModel.findById(id)
     .then((tweet)=>{
         if(tweet){
          response.send(tweet)
         }else{
             response.send("tweet not found!")
         }
     })
    
}



const deleteTweet = async (request, response) =>{
    const {id} = request.params
    await TweetModel.findByIdAndDelete(id)
    .then((blog)=>{
        if(!blog){
            console.log('tweet does not exist')
            return response.send({
                message: "tweet does not exist"
            })
        }
        console.log(`The tweet with id ${id} has been `)
        response.send({
            message: "Tweet has been deleted"
        })
        console.log(`The tweet with id ${id} has been `)
    })
    .catch((err)=>{
        return response.send({
            message: err
        })
    })
}

export {createTweet,getTweets,getTweet,updateTweet,deleteTweet}