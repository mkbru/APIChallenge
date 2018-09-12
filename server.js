const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config/config');

const connection = require('./database/connection');

const shops = require('./controllers/shops');
const products = require('./controllers/products');
const orders = require('./controllers/orders');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//using for testing and dev
app.get('/', (req,res,next) => {
   res.json({"message":"received"});
});

//routes
app.use('/shops',shops);
app.use('/products',products);
app.use('/orders',orders);


app.listen(8080, () => console.log('Server listening on port 8080'));

module.exports = app;