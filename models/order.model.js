const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const OrderModel = mongoose.model("Orders",OrderSchema);

module.exports = {
    OrderModel
}