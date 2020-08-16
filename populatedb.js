#! /usr/bin/env node


// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Item = require('./models/item');
var Category = require('./models/category');


console.log(`url:${userArgs[0]}`)
var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = []
var categories = []


function itemCreate(name, price, number_in_stock, categories, cb){
  itemdetail = {name: name, price: price, number_in_stock: number_in_stock, categories: categories};
  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New item: ${item}`);
    items.push(item);
    cb(null, item);
  })
}

function categoryCreate(name, description, cb){
  var category = new Category({name: name, description: description});
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New Category: ${category}`);
    categories.push(category);
    cb(null, category);
  })
}

function createCategories(cb){
  async.series([
    function(callback) {
      categoryCreate('electronics', 'electronic devices', callback);
    },
    function(callback) {
      categoryCreate('outdoors', 'Items for the outdoors', callback);
    },
    function(callback) {
      categoryCreate('clothing', 'Clothing items', callback);
    },

  ],
  cb)

}

function createItems(cb){
  async.parallel([
    function(callback){
      itemCreate('Tv', '100', 7, categories[0], callback);
    },
    function(callback){
      itemCreate('Bike', '250', 8, categories[1], callback);
    },
    function(callback){
      itemCreate('Outdoor Jacket', '80', 20, [categories[1],categories[2]], callback);
    },
  ],
  cb)

}







async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


