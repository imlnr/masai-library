const express = require("express");
const { BookModel } = require("../models/book.model");
const { auth } = require("../middlewares/AdminAuth.middleware");
const bookRouter = express.Router();

bookRouter.get("/books", async (req, res) => {
    try {
        const books = await BookModel.find();
        res.status(200).json({ "books": books });
    } catch (error) {
        res.send({ error: error })
    }
});

bookRouter.get("/books/:id", async (req, res) => {
    const bookid = req.params.id;
    try {
        const book = await BookModel.findOne({ _id: bookid });
        res.status(200).json({ "data": book });
    } catch (error) {
        console.log(error);
        res.send({ "msg": error });
    }
});
// bookRouter.get("/books", async (req, res) => {
//     const { category } = req.query;
//     try {
//         const book = await BookModel.find({ category });
//         res.status(200).json(book);
//     } catch (error) {
//         res.status(500).send({ "msg": "Internal server error." })
//     }
// });

bookRouter.get('/books', async (req, res) => {
    try {
        const { author, category } = req.query;
        const query = {};
        if (author) {
            query.author = author;
        }
        if (category) {
            query.category = category;
        }
        const books = await BookModel.find(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ "msg": 'Internal server error' })
    }
})
bookRouter.post('/books', auth, async (req, res) => {
    const { title, author, category, price, quantity } = req.body;
    try {
        const books = new BookModel({ title, author, category, price, quantity });
        await books.save();
        res.status(201).send({ "msg": "you have successfully added a book" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

bookRouter.put('/books/:id', auth, async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, category, price, quantity } = req.body;
        const updatedBook = await BookModel.findByIdAndUpdate(id, { title, author, category, price, quantity }, { new: true });
        if (!updateBook) {
            return res.status(404).send({ "msg": "book not found!" })
        }
        res.status(204).send({ "msg": "updated successfully" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
})

bookRouter.delete('/books/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        await BookModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ "msg": "deleted successfully..." })
    } catch (error) {
        res.status(500).send({ "msg": 'Internal server error', error })
    }
})

module.exports = {
    bookRouter
}