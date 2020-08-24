var Item = require('../models/item');
var Category = require('../models/category');
const { body,valudationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var async = require('async')

exports.index = function(req, res) {
    
    async.parallel({
        item_count: function(callback) {
            Item.countDocuments({}, callback)
        },
        category_count: function(callback){
            Category.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', {title: 'Store', error: err, data: results})
    });
}

exports.item_list = function(req, res, next) {
    Item.find({}, 'name')
        .exec(function (err, list_items){

            if(err) {return next(err);}

            res.render('item_list', {title: 'Item List', item_list: list_items});
        })
}

exports.item_detail = function(req, res, next){
    async.parallel({
        item: function(callback){
            Item.findById(req.params.id)
                .populate('categories')
                .exec(callback);
        }
    }, function(err, results){
        if (err) {return next(err);}
        if (results.item==null) { //No results
            var err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }

        res.render('item_detail', {title: results.item.name, item: results.item});
    });
}

exports.item_create_get = function(req, res){
    async.parallel({
        categories: function(callback){
            Category.find(callback);
        }
    }, function(err, results){
        if (err) {return next(err);}
        res.render('item_form', {title: 'New Item', categories: results.categories})
    });
}

exports.item_create_post = [
    (req, res, next) => {
        if(!(req.body.category instanceof Array)){
            if(req.body.category === undefined){
                req.body.category=[]
            }
            else {
                req.body.category = new Array(req.body.category);
            }
        }
        next();
    },
    //validate fields
    body('name', 'Name is required').trim().isLength({min: 1}),
    body('price', 'Price is required').trim().isLength({min: 1}),

    sanitizeBody('*').escape(),

    (req, res, next) => {
        const errors = valudationResult(req);


        var item = new Item(
        {   name: req.body.name,
            price: req.body.price,
            categories: req.body.categories
        });

        if (!errors.isEmpty()) {
            async.parallel({
                categories: function(callback){
                    Category.find(callback);
                }
            }, function(err, results){
                if (err) {return next(err);}
                for (let i = 0; i < results.categories.length; i++) {
                    if(item.categories.indexOf(results.categories[i]._id) > -1){
                        results.categories[i].checked=true;
                    }
                }
                res.render('item_form', {title: 'New Item', categories: results.categories})
            });
        }

        
        
    }




]

exports.item_delete_get = function(req,res){
    res.send('NOT IMPLEMENTED: Item Delete GET');
}

exports.item_delete_post = function(req,res){
    res.send('NOT IMPLEMENTED: Item Delete POST');
}

exports.item_update_get = function(req, res){
    res.send('NOT IMPLEMENTED: Item Update: GET')
}

exports.item_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Item Update: POST');
}