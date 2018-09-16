const express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    config = require('./config/config'),
    connection = require('./database/connection');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res,next) => {
   res.json({"message":"received"});
});

//routes
const shops = require('./routes/shops'),
      products = require('./routes/products'),
      orders = require('./routes/orders');

app.use('/shops',shops);
app.use('/products',products);
app.use('/orders',orders);



app.listen(config.PORT, () => console.log('API Challenge listening on port 8080'));

module.exports = app;