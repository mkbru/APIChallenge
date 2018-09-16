const express = require('express');
const router = express.Router();
const config = require('../config/config');
const Shop = require('../models/Shop');

router.post('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        Shop.addShop(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        Shop.getShops(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:shopId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        Shop.getShop(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:shopId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        Shop.updateShop(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:shopId', (req,res) => { 
    if(req.headers.authorization === config.secret){
        Shop.deleteShop(req,res);
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

module.exports = router;