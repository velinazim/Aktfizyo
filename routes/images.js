const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const multer = require('multer');
const path   = require('path');

/** Storage Engine */
const storageEngine = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, fn){
        fn(null, file.originalname);
    }
});

//init

const upload =  multer({
    storage: storageEngine,
    limits: { fileSize:200000 },
    fileFilter: function(req, file, callback){
        validateFile(file, callback);
    }
}).single('photo');


const validateFile = function(file, cb ){
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType  = allowedFileTypes.test(file.mimetype);
    if(extension && mimeType){
        return cb(null, true);
    }else{
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}

const myCustomLabels = {
    totalDocs: 'totalItems',
    docs: 'content',
    limit: 'pageSize',
    page: 'currentPage',
    totalPages: 'totalPages'
};

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

router.post('/', function(req, res) {
    upload(req, res,(error) => {
        if(error){
            res.json({upload: 'dosyanın ebatı bütük'});
        }else{
            if(req.file === undefined){

                res.json({upload: 'tanımsız'});

            }else{
                const fullPath = req.file.originalname;

                const document = {
                    imagePath: fullPath,
                    searchText: req.file.originalname,
                    status: 1
                };

                const photo = new Image(document);
                photo.save(function(error){
                    if(error){
                        throw error;
                    }
                    res.json({upload: 'success'});
                });
            }
        }
    });
});

router.get('/pagination',(req,res,next) =>{
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Image.paginate({},{ offset, limit, customLabels: myCustomLabels}, (err, result) => {
        if (err) {
            console.err(err);
        } else {
            res.json(result);
        }
    })
});

router.get('/' ,(req,res,next) => {
    const promise = Image.find( { });
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});
router.get('/:image_id' ,(req,res,next) => {
    const promise = Image.findById(req.params.image_id);
    promise.then((images) => {
        if(!images)
            next({message: 'image bulunamadı'});

        res.json(images);
    }).catch((err) => {
        res.json(err);
    });
});
router.put('/:image_id' ,(req,res,next) => {
    const promise = Image.findByIdAndUpdate(
        req.params.image_id,
        req.body,{
            new: true
        }
    );
    promise.then((images) => {
        if(!images)
            next({message: 'image bulunamadı'});
        res.json(images);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:image_id' ,(req,res,next) => {
    const promise = Image.findByIdAndDelete(
        req.params.image_id
    );
    promise.then((images) => {
        if(!images)
            next({message: 'image bulunamadı'});
        res.json(images);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;