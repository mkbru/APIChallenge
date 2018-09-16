const connection = require('../database/connection');

const Product = {

    addProduct: (req,res)=>{
        const productId = req.body.productId;
        const name = req.body.name;
        const price = req.body.price;
        const inventory = req.body.inventory;
        const shopId = req.body.shopId;

        const query1 = "select count(*) AS COUNT from products where product_id = ?;";
        const query2 = "select count(*) AS COUNT from shops where shop_id = ?;";
        const bigQuery = query1 + query2;
        const query3 =  "INSERT INTO products (product_id,name,price,inventory,shop_id) VALUES "+
            "('"+productId+"','"+name+"','"+price+"','"+inventory+"','"+shopId+"');";

        if(productId === undefined || name === undefined || price === undefined || inventory === undefined || shopId === undefined){
            return res.json({'error':'all fields must be set', 'fields':'productID,name,price,inventory,shopId'});
        }

        connection.query(
            bigQuery, [productId,shopId],
            (error, results, fields) => {
                if (error) throw error;
                if(results[0][0].COUNT > 0){      //edge case:
                    return res.json({'error':'product already exists'});
                }
                if(results[1][0].COUNT === 0){      //edge case:
                    return res.json({'error':'shop does not exist'});
                }

                connection.query(
                    query3, (error,results,fields) => {
                        if (error) throw error;
                        return res.json({'message' : 'added new product', 'name' : name, 'price' : price, 'inventory':inventory});
                    })
            }
        );
    },

    getProducts: (req,res)=>{
        const query =  "SELECT * FROM products";
        return connection.query(
            query,
            (error, results, fields) => {
                if (error) throw error;
                let products = [];

                for(let i=0; i<results.length; i++){
                    let productId = results[i].product_id;
                    let name = results[i].name;
                    let price = results[i].price;
                    let inventory = results[i].inventory;
                    let shopId = results[i].shop_id;
                    products.push({productId,name,price,inventory,shopId});
                }
                let response = [{'products':products}];

                return res.json(response);
            }
        );
    },

    getProduct: (req,res)=>{
        const productId = req.params.productId;
        const query = "SELECT * FROM products WHERE product_id = ?;";
        const query2 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";
        const bigQuery = query + query2;
        connection.query(
            bigQuery, [productId,productId],
            (error, results, fields) => {
                if (error) throw error;

                if(results[1][0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    return res.json(results[0][0]);
                }
            }
        );
    },

    updateProduct: (req,res)=>{
        const productId = req.params.productId;
        const name = req.body.name;
        const price = req.body.price;
        const inventory = req.body.inventory;

        const updateClause = "UPDATE products SET ";
        const product_name = "name = '"+name+"', ";
        const product_price = "price = "+price+", ";
        const product_inventory = "inventory = "+inventory;
        const whereClause = " WHERE product_id = ?;";
        const query = updateClause + product_name + product_price + product_inventory + whereClause;

        const query2 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";

        if(name === undefined || price === undefined || inventory === undefined){
            return res.json({'error':'all fields must be set', 'fields':'name,price,inventory'});
        }

        connection.query(
            query2, productId,
            (error, results, fields) => {
                if (error) throw error;
                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    connection.query(
                        query,productId,
                        (error,results,fields) => {
                            if (error) throw error;
                            res.json({'message' : 'updated product', 'name' : name, 'price' : price})
                        }
                    );
                }
            }
        );
    },

    deleteProduct: (req,res)=>{
        const productId = req.params.productId;

        const query1 = "SELECT count(*) as COUNT FROM products WHERE product_id = ?;";
        const query2 =  "DELETE FROM products WHERE product_id = ?";

        connection.query(
            query1,req.params.productId,
            (error, results, fields) => {
                if (error) throw error;

                if(results[0].COUNT === 0){      //edge case:
                    return res.json({'error':'product doesn\'t exist'});
                }
                else{
                    connection.query(
                        query2,productId,
                        (error,results,fields) => {
                            if (error) throw error;
                            res.json({'message' : 'deleted product', 'productId' : productId})
                        }
                    );
                }
            }
        );
    }

};

module.exports = Product;