import {OpenFoodFactsDataSource} from "../../src/datasource/OpenFoodFactsDataSource";
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {SequelizeFoodProduct} from "../../src/database/db-models/SequelizeFoodProduct";

chai.use(chaiHttp);
chai.should();
const dataSource = new OpenFoodFactsDataSource;

describe('OpenFoodFactsDataSource', () => {
    it('Api works ',  (done) => { // the single test
        chai.request('http://localhost:8082')
            .get('/api/v1/foodproduct?barcode=7613404377888')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    it('Should convert data ',  (done) => { // the single test
        chai.request('http://localhost:8082')
            .get('/api/v1/foodproduct?barcode=7613404377888')
            .end(async (err, res) => {
                const data = JSON.parse(res.body);
                const converted = await dataSource.convertData(data.data);
                converted.should.be.an('foodProduct');
            });
        done();
    });

    it('should convert Kj to Kcal', function (){
        const dataSource = new OpenFoodFactsDataSource;
        const kj: number = 2000;
        const kcal = dataSource.convertKJtoKCAL(kj)
        expect(kcal).to.equal(kj*0.2389);
    });

    after(async () => {
        await SequelizeFoodProduct.destroy(
            {
                where: {},
            }
        )
    })
});
