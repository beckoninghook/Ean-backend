
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../../../src"

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('FoodProductController Get Barcode tests', () => { // the tests container
    it('Checking Get Barcode Function With Existing Barcode ',  (done) => { // the single test   
        chai.request('http://localhost:8080')
        .get('/api/v1/foodproduct?barcode=7613404377888')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.be.a('object').to.have.property("carbohydrates");
            res.body.should.be.a('object').to.have.property("carbohydrates").to.equal(10);
            done();
         });
    });

    it('Checking Get Barcode Function With Incorrect Barcode ',  (done) => { // the single test   
        chai.request('http://localhost:8080')
        .get('/api/v1/foodproduct?barcode=7613404077888')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
         });
    });
});

