const express = require("express");
const { BookModel } = require("../models/book.model");
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
bookRouter.get("/books", async (req, res) => {
    const { category } = req.query;
    try {
        const book = await BookModel.find({ category });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).send({ "msg": "Internal server error." })
    }
});

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

module.exports = {
    bookRouter
}