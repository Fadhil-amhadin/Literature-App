const multer = require('multer')

exports.uploadFile = (docFile) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "uploads")
        },
        filename: function(req, file, cb){
            //second params is the file name
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
        }
    })

    const fileFilter = (req, file, cb) => {
        if(file.fieldname === docFile){
            if(!file.originalname.match(/\.(pdf|PDF|png|jpg)$/)){
                req.fileValidationError = {
                    message: "File is unsupported"
                }
            }
        }
        cb(null, true)
    }
    const sizeInMB = 10;
    const maxSize = sizeInMB * 1024 * 1024;

    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).fields([
        {
            name : docFile,
            maxCount: 4
        }
    ])
    return (req, res, next) => {
        upload(req, res, function(err){
            if(req.fileValidationError){
                return res.status(400).send(req.fileValidationError)
            }
            if(!req.files && !err){
                return res.status(400).send({
                    message: "please select file to upload"
                })
            }
        
            if (err){
                console.log(err)
                if(err.code === 'LIMIT_FILE_SIZE'){
                    return res.status(400).send({
                        message: "maximum file size is 10MB"
                    })
                }
                return res.status(400).send(err)
            }
            return next()
        })
    }
    
}
