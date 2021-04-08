const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRouter = require('./routers/productRouter');
const userRouter = require("./routers/userRouter");
const orderRouter = require("./routers/orderRouter");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));



// DB Connection
mongoose.connect('mongodb://localhost/drogstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Router
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// PAYPAL
app.get('/api/config/paypal', (req, res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

// Error Message
app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

// Run a Server
const port = process.env.PORT || 5050;
app.listen(port, ()=>{
    console.log('Server is runing');
});