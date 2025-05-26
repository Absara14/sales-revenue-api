const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    productId: String,
    name:String,
    category :String
});

module.exports = mongoose.model('Product', ProductSchema);