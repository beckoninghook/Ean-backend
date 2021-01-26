import chai from 'chai';
import chaiHttp from 'chai-http';
import {SequelizeFoodProduct} from "../../../src/database/db-models/SequelizeFoodProduct";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('FoodProductController GET tests', () => {
    it('should return a correct foodproduct when queried with an existing barcode.',   (done) => {
        chai.request('http://localhost:8082')
        .get('/api/v1/foodproduct?barcode=7613404377888')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.be.a('object').to.have.property("carbohydrates");
            res.body.should.be.a('object').to.have.property("carbohydrates").to.equal(10);
            done();
         });
    });

    it('should return 404 when querying a nonexisting barcode.',  (done) => {
        chai.request('http://localhost:8082')
        .get('/api/v1/foodproduct?barcode=7613404077888')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            done();
         });
    });

    after(async () => {
        await SequelizeFoodProduct.destroy(
            {
                where: {},
            }
        )
    })
});

