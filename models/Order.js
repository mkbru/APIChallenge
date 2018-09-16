const connection = require('../database/connection');

const Order = {

    addOrder: (req,res)=>{
        const orderId = req.body.orderId;
        const shopId = req.body.shopId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;


        const query1 = "select count(*) AS COUNT from orders where order_id = ?;";                          //results[0]
        const query2 = "select shop_id from orders where order_id = ?;";                                    //results[1]
        const query3 = "select count(*) AS COUNT from products where shop_id = ? and product_id = ?;";      //results[2]
        const query4 = "select count(*) AS COUNT from orders where order_id = ? and product_id = ?;";       //results[3]
        const query5 = "select count(*) AS COUNT from shops where shop_id = ?;";                            //results[4]
        const query6 = "select inventory from products where product_id = ?";

        const insertClause = "INSERT INTO orders (order_id,product_id,shop_id,quantity) values ("+req.body.orderId+","+req.body.productId+","+req.body.shopId+","+req.body.quantity+");";

        const bigQuery = query1 + query2 + query3 + query4 + query5 + query6;

        connection.query(
            bigQuery,[req.body.orderId, req.body.orderId, req.body.shopId,productId, req.body.orderId,req.body.productId, req.body.shopId,productId],
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
                if(results[5][0].inventory < quantity){
                    return res.json({'error':'not enough inventory in stock', 'amount requested':quantity, 'amount available':results[5][0].product_inventory});
                }
                else{
                    //orderid does not exist, can create new order with this id
                    if(results[0][0].COUNT === 0){
                        connection.query(
                            insertClause, (error,results) => {
                                if (error) throw error;
                                return res.json({'message' : 'added order item', 'orderId' : orderId, 'productId' : productId, 'quantity' : quantity});
                            }
                        )
                    }
                    else{
                        //orderid not empty make sure an order contains only 1 type of shopId
                        if(results[1][0].shop_id === shopId){
                            connection.query(
                                insertClause, (error,results) => {
                                    if (error) throw error;
                                    return res.json({'message' : 'added order item', 'orderId' : orderId, 'productId' : productId, 'quantity' : quantity});
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
    },
    getOrders: (req,res)=>{
        const query = "select order_id,orders.shop_id,products.product_id,products.name,quantity,products.price, (quantity*products.price) as total From orders left join products on orders.product_id = products.product_id;";

        connection.query(
            query,
            (error, results) => {
                if (error) throw error;

                let orderSet = new Set();

                //iterates all results to create a set of order ids
                for(let i=0; i<results.length; i++){
                    orderSet.add(results[i].order_id);
                }

                //iterate order Set, on every iteration we iterate through the results and pick out the ones for the current order
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
                                'productName' : results[i].name,
                                'productPrice' : results[i].price,
                                'quantity' : results[i].quantity,
                                'subtotal' : results[i].total
                            };
                            total +=  results[i].total;
                            products.push(tmp);
                            orderId = results[i].order_id;
                            shopId = results[i].shop_id;
                        }
                    }
                    jsonRes.push({'order':{'orderId':orderId, 'orderTotal':Math.round(total * 100) / 100,products,'shopId':shopId}});
                }
                res.json(jsonRes);
            }
        );
    },
    getOrder: (req,res)=>{

        const orderId = req.params.orderId;
        const query1 = "select count(*) as COUNT from orders where order_id = ?;";
        const query2 = "select order_id,orders.shop_id,products.product_id,products.name,quantity,products.price, (quantity*products.price) as total From orders left join products on orders.product_id = products.product_id WHERE order_id = ?;";

        connection.query(
            query1, orderId,
            (error,results,fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'order doesn\'t exist'});
                }else{
                    connection.query(
                        query2, orderId,
                        (error, results) => {
                            if (error) throw error;

                            let productsJ = [];
                            let orderIdJ = results[0].order_id;
                            let shopIdJ = results[0].shop_id;
                            let totalJ = 0;

                            for(let i=0; i<results.length; i++){
                                let tmp = {
                                    'productName' : results[i].name,
                                    'productPrice' : results[i].price,
                                    'quantity' : results[i].quantity,
                                    'subtotal' : results[i].total
                                };
                                totalJ +=  results[i].total;
                                productsJ.push(tmp);
                            }
                            res.json({'order':{'orderId':orderIdJ, 'orderTotal':Math.round(totalJ * 100) / 100,productsJ,'shopId':shopIdJ}});
                        }
                    );
                }
            }
        );
    },
    updateOrder: (req,res)=>{
        const orderId = req.params.orderId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;

        const query1 = "select count(*) as COUNT from orders where order_id = ? and product_id =?;";
        const query2 = "UPDATE orders SET quantity = "+req.body.quantity+" WHERE order_id = ? AND product_id = " + req.body.productId;

        connection.query(
            query1, [req.params.orderId,req.body.productId],
            (error, results) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'product not found on this order'});
                }else{
                    connection.query(
                        query2, req.params.orderId,
                        (error, results, fields) => {
                            if (error) throw error;
                            res.json({'message':'updated product quantity','orderId':orderId, 'productId':productId, 'quantity':quantity});
                        }
                    );
                }
            }
        );
    },
    deleteOrder: (req,res)=>{
        const orderId = req.params.orderId;
        const query1 = "select count(*) as COUNT from orders where order_id = ?;";
        const query2 = "DELETE FROM orders WHERE order_id = ?;";

        connection.query(
            query1,req.params.orderId,
            (error, results) => {
                if(results[0].COUNT === 0){
                    if (error) throw error;

                    return res.json({'error':'order doesn\'t exist'});
                }else{
                    connection.query(
                        query2,req.params.orderId,
                        (error, results) => {
                            if (error) throw error;

                            res.json({'message':'deleted order','orderId':orderId});
                        }
                    );
                }
            }
        );
    }

};

module.exports = Order;