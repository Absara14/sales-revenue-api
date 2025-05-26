const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: String,
  productId: String,
  customerId: String,
  region: String,
  dateOfSale: Date,
  quantitySold: Number,
  unitPrice: Number,
  discount: Number,
  shippingCost: Number,
  paymentMethod: String
});

module.exports = mongoose.model('Order', OrderSchema);
