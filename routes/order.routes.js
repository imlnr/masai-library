const express = require('express');
const orderRouter = express.Router();
const { OrderModel } = require('../models/order.model');
// const { authMiddleware } = require('../middlewares/auth.middleware');
const { orderauth } = require('../middlewares/Orderauth.middleware');


orderRouter.post('/order', orderauth, async (req, res) => {
    try {
        const { user, books, totalAmount } = req.body;

        const newOrder = new OrderModel({
            user,
            books,
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


orderRouter.get('/orders', orderauth, async (req, res) => {
    try {

        const orders = await OrderModel.find().populate('User').populate('Book');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = orderRouter;