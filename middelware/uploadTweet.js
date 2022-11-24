import path from 'path'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads')
    },
    filename: (req,file,cb)=>{
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }

})

export const uploadTweet = multer({
    storage: storage,

    limits:{
        fileSize: 1024 * 1024 * 40
    }
})