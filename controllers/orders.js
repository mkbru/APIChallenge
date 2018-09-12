const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const config = require('../config/config');

router.post('/', (req,res) => {
    if(req.headers.authorization === config.secret){
        const query1 = "select * from orders where order_id = ?;";
        const query2 = "select shop_id from orders where order_id = ?;";
        const query3 = "select count(*) AS COUNT from products where shop_id = ? and product_id = ?;";
        const query5 = "select count(*) AS COUNT from orders where order_id = ? and product_id = ?;";
        const query6 = "select count(*) AS COUNT from shops where shop_id = ?;";

        const insertClause = "INSERT INTO orders (order_id,product_id,shop_id,quantity) values ";
        const values = "("+req.body.orderId+","+req.body.productId+","+req.body.shopId+","+req.body.quantity+");";
        const query4 = insertClause + values;

        const bigQuery = query1 + query2 + query3 + query5 + query6;

        connection.query(
            bigQuery,[req.body.orderId,req.body.orderId,req.body.shopId,req.body.productId,req.body.orderId,req.body.productId,req.body.shopId],
            (error, results, fields) => {
                if (error) throw error;

                if(results[4][0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop not found'});
                }
                if(results[2][0].COUNT === 0){      //edge case: product_id not found in shop with shop_id
                    return res.json({'error':'product not found in this shop'});
                }
                if(results[3][0].COUNT > 0){      //edge case: product_id not found in shop with shop_id
                    return res.json({'error':'product already in order','message':'use /PUT to update product quantities /DELETE to delete a product'});
                }


                else{
                        //results[0] -> select * from orders where order_id = ?
                        //orderid empty means in the clear
                        if(results[0].length === 0){ 
                            connection.query(
                                query4, (error,results,fields) => {
                                    if (error) throw error;
                                    return res.json({'message' : 'added order item', 'orderId' : req.body.orderId, 'productId' : req.body.productId, 'quantity' : req.body.quantity});
                                }
                            )
                        }
                        else{ 
                            //orderid not empty
                            //results[1]-> select shop_id from orders where order_id = ?
                            //make sure an order contains only 1 type of shopId
                            if(results[1][0].shop_id === req.body.shopId){
                                connection.query(
                                    query4, (error,results,fields) => {
                                        if (error) throw error;
                                        return res.json({'message' : 'added order item', 'orderId' : req.body.orderId, 'productId' : req.body.productId, 'quantity' : req.body.quantity});
                                    }
                                )
                            }
                            else{
                                return res.json({'error':' cannot add products from multiple shops on one order'});
                            }
                        }
                }
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/', (req,res) => {     
    if(req.headers.authorization === config.secret){
        const query = "select order_id,orders.shop_id,products.product_id,products.product_name,quantity,products.product_price, (quantity*products.product_price) as total From orders left join products on orders.product_id = products.product_id"

        connection.query(
            query,
            (error, results, fields) => {
                if (error) throw error;

                let orderSet = new Set();

                //iterates all results to create a set of order ids
                for(let i=0; i<results.length; i++){
                   orderSet.add(results[i].order_id);
                }

                //now we have all the order numbers in the set
                //iterate all objects again comparing their order_id to the ids in the set

                //iterate for the amount of order  ids
                //during every iteration we iterate through the results and pick out the ones for the current order
                //create an object on every iteration

                let jsonRes = [];

                for(let key of orderSet.values()){
                    let products = [];
                    let orderId = '';
                    let shopId = '';
                    let total = 0;

                    for(let i=0; i<results.length; i++){
                        if(results[i].order_id === key){ //if order_id equals the current key
                            //creating object to push into jsonResponse
                            let tmp = {
                                'productName' : results[i].product_name,
                                'productPrice' : results[i].product_price,
                                'quantity' : results[i].quantity,
                                'subtotal' : results[i].total
                            };
                            total +=  results[i].total;
                            products.push(tmp);
                            orderId = results[i].order_id;
                            shopId = results[i].shop_id;
                        }
                     }

                     jsonRes.push({'order':{'orderId':orderId, 'orderTotal':total,products,'shopId':shopId}});
                }
                res.json(jsonRes);
            }
        );
    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.get('/:orderId', (req,res) => {    
    if(req.headers.authorization === config.secret){

        const query = "select order_id,orders.shop_id,products.product_id,products.product_name,quantity,products.product_price, (quantity*products.product_price) as total From orders left join products on orders.product_id = products.product_id WHERE order_id = ?;";
        const query2 = "select count(*) as COUNT from orders where order_id = ?;";

        connection.query(
            query2, req.params.orderId,
            (error,results,fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'order doesn\'t exist'});
                }else{
                    connection.query(
                        query, req.params.orderId,
                        (error, results, fields) => {
                            if (error) throw error;

                            let products = [];
                            let orderId = results[0].order_id;
                            let shopId = results[0].shop_id;
                            let total = 0;

                            for(let i=0; i<results.length; i++){
                                let tmp = {
                                    'productName' : results[i].product_name,
                                    'productPrice' : results[i].product_price,
                                    'quantity' : results[i].quantity,
                                    'subtotal' : results[i].total
                                };
                                total +=  results[i].total;
                                products.push(tmp);
                            }

                            res.json({'order':{'orderId':orderId, 'orderTotal':total,products,'shopId':shopId}});
                        }
                    );
                }
            }

        )


    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.put('/:orderId', (req,res) => {    
    if(req.headers.authorization === config.secret){
        const updateClause = "UPDATE orders SET ";
        const quantity = "quantity = "+req.body.quantity;
        const whereClause = " WHERE order_id = ?";
        const andClause = " AND product_id = " + req.body.productId;
        const query = updateClause + quantity + whereClause + andClause;
        const query2 = "select count(*) as COUNT from orders where order_id = ? and product_id =?;";

        connection.query(
            query2, [req.params.orderId,req.body.productId],
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop doesn\'t exist'});
                }else{
                    connection.query(
                        query, req.params.orderId,
                        (error, results, fields) => {
                            if (error) throw error;
                            res.json({'message':'update product quantity','orderId':req.body.orderId, 'productId':req.body.productId, 'quantity':req.body.quantity});
                        }
                    );
                }
            }
        );


    }else{
        res.json({"HTTP/1.1":"401 Unauthorized", "Date" : new Date()});
    }
});

router.delete('/:orderId', (req,res) => {  
    if(req.headers.authorization === config.secret){
        const query = "DELETE FROM orders WHERE order_id = ?;";
        const query2 = "select count(*) as COUNT from orders where order_id = ?;";

        connection.query(
            query2,req.params.orderId,
            (error, results, fields) => {
                if(results[0].COUNT === 0){
                    if (error) throw error;

                    return res.json({'error':'order doesn\'t exist'});
                }else{
                    connection.query(
                        query,req.params.orderId,
                        (error, results, fields) => {
                            if (error) throw error;

                            res.json({'message':'deleted order','orderId':req.params.orderId});
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