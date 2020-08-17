var Category = require('../models/category');
const { default: async } = require('async');
const Item = require('../models/item');

exports.category_list = function(req, res){
    Category.find({}, 'name')
        .exec(function(err, list_categories){
            if(err) {return next(err);}

            res.render('category_list', {title: 'Category List', category_list: list_categories});
        })
}

exports.category_detail = function(req, res) {
    async.parallel({
        category: function(callback){
            Category.findById(req.params.id)
                .exec(callback);
        },
        category_items: function(callback) {
            Item.find({'categories': req.params.id}, 'name price')
                .exec(callback);
        }   
    }, 
    function(err, result){
        if (err){return next(err);}
        if (result.category == null) {
            var err = new Error('Category not found');
            err.status = 404;
            return next(err)
        }
        res.render('category_detail',{title: 'Category Details', category: result.category, category_items: result.category_items});
    });
}

exports.category_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category Create: GET');
}

exports.category_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Category Create: POST');
}

exports.category_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED: Category Delete: GET');
}

exports.category_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED: Category Delete: POST');
}

exports.category_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Category Update: GET');
}

exports.category_update_post = function(req, res){
    res.send('NOT IMPLEMENTED: Category Update: POST');
}