const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();

const app = express();



app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db....");
        console.log("your server is running at port http://localhost:4500");
    } catch (error) {
        console.log(error);
    }
})