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

export const upload = multer({
    storage: storage,
    fileFilter: (req,file,callback)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ){
            callback(null,true)
        }else{
            console.log("only jpg / png are allowed!")
            callback(null,false)
        }

    },
    limits:{
        fileSize: 1024 * 1024 * 2
    }
})