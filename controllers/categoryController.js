var Category = require('../models/category');

exports.category_list = function(req, res){
    res.send('NOT IMPLEMENTED: Category list');
}

exports.category_detail = function(req, res) {
    res.send(`NOT IMPLEMENTED: Category Detail: ${req.params.id}`);
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