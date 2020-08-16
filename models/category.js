var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, minlength: 2, maxlength: 50,}
        
    }
);

CategorySchema.virtual('url').get(function () {
    return `/store/categories/${this._id}`
})

module.exports = mongoose.model('Category', CategorySchema);