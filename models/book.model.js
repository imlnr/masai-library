const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const BookModel = mongoose.model("Book",BookSchema);

module.exports = {
    BookModel
}