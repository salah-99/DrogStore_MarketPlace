const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Product = require("../models/productModel");
const data = require("../data");

const productRouter = express.Router();


// Get All Product
productRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
}));

// Send Product
productRouter.get('/send', expressAsyncHandler(async (req, res) =>{
    // await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({createProducts});
}));

// Get a Specific Product 
productRouter.get('/:id', expressAsyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: 'Product Not Found'});
    }
}));

module.exports = productRouter;