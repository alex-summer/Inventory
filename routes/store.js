var express = require('express');
var router = express.Router();

var category_controller = require('../controllers/categoryController')
var item_controller = require('../controllers/itemController');
const item = require('../models/item');

//Item Routes
//======================================================

// GET home page
router.get('/', item_controller.index);

//GET Create item
router.get('/items/create', item_controller.item_create_get);

//POST Create item
router.post('/items/create', item_controller.item_create_post);

//GET Delete item
router.get('/items/:id/delete', item_controller.item_delete_get);

//POST Delete item
router.post('/items/:id/delete', item_controller.item_delete_post);

//GET Update item
router.get('/items/:id/update', item_controller.item_update_get);

//POST Update item
router.post('/items/:id/update', item_controller.item_update_post);

//GET One itemm
router.get('/items/:id', item_controller.item_detail);

//GET All items
router.get('/items', item_controller.item_list);


//Category Routes
//======================================================

//GET Create category
router.get('/categories/create', category_controller.category_create_get);

//POST Create category
router.post('/categories/create', category_controller.category_create_post);

//GET Delete category
router.get('/categories/:id/delete', category_controller.category_delete_get);

//POST Delete category
router.post('/categories/:id/delete', category_controller.category_delete_post);

//GET Update category
router.get('/categories/:id/update', category_controller.category_update_get);

//POST Update category
router.post('/categories/:id/update', category_controller.category_update_post);

//GET List All Categories
router.get('/categories', category_controller.category_list);

//GET List One Category
router.get('/categories/:id', category_controller.category_detail);






module.exports = router;