import {FoodProduct} from "../../src/models/FoodProduct";
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from "../../src/application"
import {testDatabase} from "../../src/database/testDatabase"
import {SequelizeFoodProduct} from "../../src/database/db-models/SequelizeFoodProduct";
import Config from "../../src/config";

chai.use(chaiHttp);
chai.should();

const foodObject = {
    [FoodProduct.toStringTag]: 'foodProduct'
};


describe('searchBarcodeInDatabase', () => {
    before((done) => {
        testDatabase
            .sync({force: true})
            .then(() => {
                app.listen(Config.TEST_PORT)
                done()
            })
    })

    beforeEach((done) => {
        SequelizeFoodProduct.destroy(
            {
                where: {},
            }
        )
        done()
    })

    it('should return a foodproduct ',  async () => {
        const barcode: number = 7613404377888;
        let product = new SequelizeFoodProduct()
        product.eanBarcode = "7613404377888"
        const foodData = new SequelizeFoodProduct(product)
        try {
            foodData.save()
        } catch(e) {
            console.log(e)
        }

        const testProduct = await chai.request("http://localhost:8082")
            .get('/api/v1/foodproduct/' + barcode)

        console.log(testProduct.body)

        testProduct.should.have.status(200)
        testProduct.body.should.be.an('Array')
        //testProduct.body.should.be.an('Array').of('foodProduct')
    })

});