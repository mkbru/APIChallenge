const connection = require('../database/connection');

const Shop = {
    addShop: (req,res)=>{
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
    },
    getShops: (req,res)=>{
        const query = "SELECT * FROM shops";
        connection.query(
            query,
            (error, results, fields) => {
                if (error) throw error;
                return res.json(results);
            }
        );
    },
    getShop: (req,res)=>{
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
    },
    updateShop: (req,res)=>{
        const shopName = req.body.name;
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
    },
    deleteShop: (req,res)=>{
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
                            return res.json({'message' : 'deleted shop', 'shopId' : shopId})
                        }
                    );
                }
            }
        );
    }
};

module.exports = Shop;