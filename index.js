const express = require('express');
const { connection } = require('./config/db');
require('dotenv').config();
const cors = require('cors');
const { userRouter } = require('./routes/user.routes');
const { bookRouter } = require('./routes/book.routes');
const orderRouter = require('./routes/order.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users',userRouter)
app.use('/allbooks',bookRouter)
app.use('/allorders',orderRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to db....");
        console.log("your server is running at port http://localhost:4500");
    } catch (error) {
        console.log(error);
    }
})