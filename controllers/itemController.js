var Item = require('../models/item');
var Category = require('../models/category');

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
    res.send('NOT IMPLEMENTED: Item Create GET');
}

exports.item_create_post = function(req, res){
    res.send('NOT IMPLEMENTED:Item Create POST');
}

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