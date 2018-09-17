const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require("chai").expect;
const server = require('../server');
const should = chai.should();
const config = require('../config/config');
const connection = require('../database/connection');

chai.use(chaiHttp);

//change to different db and create a new shop and make changes to shops with id 1
describe('INTEGRATION TESTS', () =>{
    it("should connect to the database", (done)=>{

      connection.connect(((err)=>{
        if(err) throw err;
        connection.state.should.equal('authenticated');
        done();
      }))

    });

});

describe('CREATING', () =>{
    it("should add a new shop", (done) => {
        chai.request(server)
        .post('/shops')
        .set('Authorization',config.secret)
        .send({'shopId' : 4637573,'name' : 'snowboardingTesting'})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('added shop');
            done();
        })
    }); //ok

    it("should add a new product", (done) => {
        chai.request(server)
        .post('/products')
        .set('Authorization',config.secret)
        .send({'productId' : 74927,'name' : 'productTest','price':10,'inventory':5,'shopId':4637573}
        )
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('added new product');
            done();
        })
       
    }); 

    it("should add create a new order", (done) => {
        chai.request(server)
        .post('/orders')
        .set('Authorization',config.secret)
        .send({'orderId' : 937485,'productId':74927,'shopId':4637573,'quantity':2}
        )
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('added order item');
            done();
        })
       
    }); 


});

describe('READING', () =>{
    it("should get all the shops", (done) => {
        chai.request(server)
        .get('/shops')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('shop_id');
            done();
        })
    }); //ok

    it("should get shop with specified id", (done) => {
        chai.request(server)
        .get('/shops/4637573')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('shop_id');
            done();
        })
    }); //ok
    

    it("should get all the products", (done) => {
        chai.request(server)
        .get('/products')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('products');
            done();
        }); 
    }); 

    it("should get product with specified id", (done) => {
        chai.request(server)
        .get('/products/74927')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('product_id');
            done();
        }); 
    });

    it("should get all the orders", (done) => {
        chai.request(server)
        .get('/orders')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('order');
            done();
        }); 
    }); 

    it("should get an order with a specified id", (done) => {
        chai.request(server)
        .get('/orders/937485')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.be.json;
            res.body.should.have.property('order');
            done();
        }); 
    });
});

describe('UPDATING', () =>{
    it("should update a shop name", (done) => {
        chai.request(server)
        .put('/shops/4637573')
        .set('Authorization',config.secret)
        .send({'shopName' : 'snowboardingChanged'})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('updated shop');
            done();
        })
       
    });

    it("should update a product name and price", (done) => {
        chai.request(server)
        .put('/products/74927')
        .set('Authorization',config.secret)
        .send({'productName' : 'changeName', 'productPrice':15})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })  
    });

    it("should update an orders product quantity", (done) => {
        chai.request(server)
        .put('/orders/937485')
        .set('Authorization',config.secret)
        .send({'quantity' : 2, 'productId':74927})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('updated product quantity');
            done();
        })  
    });
});

describe('DELETING', () =>{

    it("should delete an order", (done) => {
        chai.request(server)
                .delete('/orders/937485')
                .set('Authorization',config.secret)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('deleted order');
                    done();
                })

    });

    it("should delete a product", (done) => {
        chai.request(server)
                .delete('/products/74927')
                .set('Authorization',config.secret)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('deleted product');
                    done();
                })

    });

    it("should delete a shop", (done) => {
        chai.request(server)
        .delete('/shops/4637573')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal('deleted shop');
            done();
        })

    });
});
