var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
    {
        name: {type: String, required: true, maxlength: 50},
        price: {type: Number},
        number_in_stock: {type: Number},
        categories: [{type: Schema.Types.ObjectId, ref:'Category'}],
    }
);

ItemSchema.virtual('url').get(function () {
    return `/store/items/${this._id}`
})

module.exports = mongoose.model('Item', ItemSchema);