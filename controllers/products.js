const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const config = require('../config/config');

router.post('/', (req,res) => {  
    if(req.headers.authorization === config.secret){
        const insertQuery =  "INSERT INTO products (product_id,product_name,product_price,shop_id) VALUES "+
        "('"+req.body.productId+"','"+req.body.productName+"','"+req.body.productPrice+"','"+req.body.shopId+"');";

        const checkPKQuery = "select count(*) AS COUNT from products where product_id = ?;";
        connection.query(
           checkPKQuery, req.body.productId,
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT > 0){      //edge case:
                    return res.json({'error':'product already exists'});
                }
                else{
                    connection.query(insertQuery, (error,results,fields) => {
                        if (error) throw error;
                        //console.log(results);
                        return res.json({'message' : 'added new product', 'productName' : req.body.productName, 'productPrice' : req.body.productPrice});
                    })
                }
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {   
    if(req.headers.authorization === config.secret){
        const query =  "SELECT * FROM products";
        connection.query(
           query,
            (error, results, fields) => {
                if (error) throw error;
                res.json(results);
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:productId', (req,res) => {      
    if(req.headers.authorization === config.secret){
        const query = "SELECT * FROM products WHERE product_id = ?;";
        const query2 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";
        const bigQuery = query + query2;
        connection.query(
            bigQuery, [req.params.productId,req.params.productId],
            (error, results, fields) => {
                if (error) throw error;

                if(results[1][0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    return res.json(results);
                }
                //res.json(results);
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:productId', (req,res) => {    
    if(req.headers.authorization === config.secret){
        const updateClause = "UPDATE products SET ";
        const product_name = "product_name = '"+req.body.productName+"', ";
        const product_price = "product_price = "+req.body.productPrice;
        const whereClause = " WHERE product_id = ?;";
        const query = updateClause + product_name + product_price + whereClause;
        const query2 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";

        connection.query(
            query2, req.params.productId,
            (error, results, fields) => {
                if (error) throw error;

                //console.log(results[0].COUNT);
                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    connection.query(
                        query,req.params.productId,
                        (error,results,fields) => {
                            if (error) throw error;
                            res.json({'message' : 'updated product', 'productName' : req.body.productName, 'productPrice' : req.body.productPrice})
                        }
                    );
                }
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:productId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        const query =  "DELETE FROM products WHERE product_id = ?";
        const query2 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";
        connection.query(
           query2,req.params.productId,
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    connection.query(
                        query,req.params.productId,
                        (error,results,fields) => {
                            if (error) throw error;
                            res.json({'message' : 'deleted product', 'productId' : req.params.productId})
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