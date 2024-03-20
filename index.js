const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db....");
        console.log("your server is running at port http://localhost:4500");
    } catch (error) {
        console.log(error);
    }
})