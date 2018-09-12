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
        .send({'shopId' : 1,'shopName' : 'snowboardingTesting'})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('affectedRows');
            res.body.affectedRows.should.equal(1);
            done();
        })
    }); //ok

    it("should add a new product", (done) => {
        chai.request(server)
        .post('/products')
        .set('Authorization',config.secret)
        .send({'productId' : 1,'productName' : 'productTest','productPrice':10,'shopId':1}
        )
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('affectedRows');
            res.body.affectedRows.should.equal(1);
            done();
        })
       
    }); 

    it("should add create a new order", (done) => {
        chai.request(server)
        .post('/orders')
        .set('Authorization',config.secret)
        .send({'orderId' : 1,'productId':1,'shopId':1,'quantity':2}
        )
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('affectedRows');
            res.body.affectedRows.should.equal(1);
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
            res.body[0].should.have.property('shop_name');
            done();
        })
    }); //ok

    it("should get shop with specified id", (done) => {
        chai.request(server)
        .get('/shops/1')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('shop_id');
            res.body[0].should.have.property('shop_name');
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
            res.body[0].should.have.property('product_id');
            res.body[0].should.have.property('product_name');
            done();
        }); 
    }); 

    it("should get product with specified id", (done) => {
        chai.request(server)
        .get('/products/1')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.have.property('product_id');
            res.body[0].should.have.property('product_name');
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
            res.body[0].should.have.property('product_id');
            res.body[0].should.have.property('product_name');
            done();
        }); 
    }); 

    it("should get an order with a specified id", (done) => {
        chai.request(server)
        .get('/orders/1')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('orderId');
            res.body.should.have.property('orderTotal');
            done();
        }); 
    });
});

describe('UPDATING', () =>{
    it("should update a shop name", (done) => {
        chai.request(server)
        .put('/shops/1')
        .set('Authorization',config.secret)
        .send({'shopName' : 'snowboardingChanged'})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
       
    });

    it("should update a product name and price", (done) => {
        chai.request(server)
        .put('/products/1')
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
        .put('/orders/1')
        .set('Authorization',config.secret)
        .send({'quantity' : 2, 'productId':1})
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            done();
        })  
    });
});

describe('DELETING', () =>{

    it("should delete an order", (done) => {
        chai.request(server)
                .delete('/orders/1')
                .set('Authorization',config.secret)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('affectedRows');
                    res.body.affectedRows.should.equal(1);
                    done();
                })
           
    });

    it("should delete a product", (done) => {
        chai.request(server)
                .delete('/products/1')
                .set('Authorization',config.secret)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('affectedRows');
                    res.body.affectedRows.should.equal(1);
                    done();
                })
           
    }); 

    it("should delete a shop", (done) => {
        chai.request(server)
        .delete('/shops/1')
        .set('Authorization',config.secret)
        .end((err,res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('affectedRows');
            res.body.affectedRows.should.equal(1);
            done();
        })
       
    }); 
});
