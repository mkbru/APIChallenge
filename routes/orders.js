const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Order = require('../models/Order');

router.post('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        Order.addOrder(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {     
    if(req.headers.authorization === config.secret){
        Order.getOrders(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:orderId', (req,res) => {    
    if(req.headers.authorization === config.secret){
        Order.getOrder(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:orderId', (req,res) => {    
    if(req.headers.authorization === config.secret){
        Order.updateOrder(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:orderId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        Order.deleteOrder(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

module.exports = router;