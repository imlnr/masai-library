const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user.model');


userRouter.post('/register', async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        const userexist = await UserModel.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ error: "User Already Register" });
        }
        bcrypt.hash(password, 8, async (err, hash) => {
            if (hash) {
                const user = new UserModel({...req.body, password: hash });
                await user.save();
                res.status(201).send({ "msg": "New user has been registered successfully !" })
            }
            else {
                res.send({ "msg": "Error creating the hash", "error": err })
            }
        })
    } catch (error) {
        res.send({ "msg": error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(402).json({ error: "User Does Not Exist" })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: user._id, author: user.name, isAdmin: user.isAdmin }, "masai", { expiresIn: '7d' });
                res.json({ "msg": "Login successful!", token, user: { name: user.name, email: user.email } });
            } else {
                console.log(err);
                res.status(403).send({ "error": "Wrong Credentials", err });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ "error": err });
    }
});

module.exports = {
    userRouter
}