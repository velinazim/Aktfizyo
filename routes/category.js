const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


router.get('/', (req,res) => {
    const promise = Category.aggregate([
        {
            $lookup: {
                from: 'images',
                localField: 'imageId',
                foreignField: '_id',
                as: 'data'
            }
        },
        {
            $unwind: '$data'
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.get('/:category_id' ,(req,res,next) => {
    const promise = Category.findById(req.params.category_id);
    promise.then((category) => {
        if(!category)
            next({message: 'category bulunamadı'});

        res.json(category);
    }).catch((err) => {
        res.json(err);
    });
});

router.post('/',(req,res) => {
    //const { title, imdb_score, category, country, year} = req.body;
    const category = new Category(req.body);
    const promise = category.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) =>{
        res.json(err);
    });
});

router.put('/:category_id' ,(req,res,next) => {
    const promise = Category.findByIdAndUpdate(
        req.params.category_id,
        req.body,{
            new: true
        }
    );
    promise.then((category) => {
        if(!category)
            next({message: 'category bulunamadı'});
        res.json(category);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/delete/:category_id' ,(req,res,next) => {
    const promise = Category.findByIdAndUpdate(
        req.params.category_id,
        {status: 0}, {new: true}
    );
    promise.then((category) => {
        if(!category)
            next({message: 'category bulunamadı'});
        res.json(category);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;