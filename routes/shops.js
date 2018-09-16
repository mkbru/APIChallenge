const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const config = require('../config/config');


router.post('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        const shopId = req.body.shopId;
        const name = req.body.name;
        const query = "INSERT INTO shops (shop_id,name) VALUES ('"+shopId+"','"+name+"')";
        const query2 = "select count(*) AS COUNT from shops where shop_id = ?;";

        connection.query(
            query2,shopId,
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT > 0){      //edge case:
                    return res.json({'error':'shop already exists'});
                }else{
                    connection.query(
                        query,
                        (error,results,fields) => {
                            if (error) throw error;
                            return res.json({'message' : 'added shop', 'name' : name})
                        }
                    );
                }

            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        const query = "SELECT * FROM shops";
        connection.query(
            query,
            (error, results, fields) => {
                if (error) throw error;
                return res.json(results);
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:shopId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        const shopId = req.params.shopId;
        const query =  "SELECT * FROM shops WHERE shop_id = ?;";
        const query2 = "select count(*) AS COUNT from shops where shop_id = ?;";
        connection.query(
           query2, shopId,
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop doesn\'t exist'});
                }else{
                    connection.query(
                        query,shopId,
                        (error,results,fields) => {
                            if (error) throw error;
                            return res.json(results)
                        }
                    );
                }
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:shopId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        const shopName = req.body.shopName;
        const shopId = req.params.shopId;
        const query = "UPDATE shops SET name = '"+shopName+"' WHERE shop_id = ?;";
        const query2 = "select count(*) AS COUNT from shops where shop_id = ?;";

        connection.query(
            query2, shopId,
            (error, results, fields) => {
                if (error) throw error;
                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop doesn\'t exist'});
                }else{
                    connection.query(
                        query,req.params.shopId,
                        (error,results,fields) => {
                            if (error) throw error;
                            return res.json({'message' : 'updated shop','id': shopId ,'updated name' : shopName})
                        }
                    );
                }
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:shopId', (req,res) => { 
    if(req.headers.authorization === config.secret){
        const shopId = req.params.shopId;
        const query = "DELETE FROM shops WHERE shop_id = ?;";
        const query2 = "select count(*) AS COUNT from shops where shop_id = ?;";

        connection.query(
            query2, shopId,
            (error, results, fields) => {
                if (error) throw error;
                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop doesn\'t exist'});
                }else{
                    connection.query(
                        query,shopId,
                        (error,results,fields) => {
                            if (error) throw error;
                            return res.json({'message' : 'deleted shop', 'shopName' : req.body.shopId})
                        }
                    );
                }
            }
        );

    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

module.exports = router;