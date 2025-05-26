const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    customerId: String,
    name: String,
    email: String,
    address: String
});

module.exports = mongoose.model('Customer', CustomerSchema);