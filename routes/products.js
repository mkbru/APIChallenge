const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Product = require('../models/Product');

router.post('/', (req,res) => {  
    if(req.headers.authorization === config.secret){
        Product.addProduct(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        Product.getProducts(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:productId', (req,res) => {      
    if(req.headers.authorization === config.secret){
        Product.getProduct(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:productId', (req,res) => {    
    if(req.headers.authorization === config.secret){
        Product.updateProduct(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:productId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        Product.deleteProduct(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

module.exports = router;