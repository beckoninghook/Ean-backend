import chai from 'chai';
import chaiHttp from 'chai-http';
import {testDatabase} from "../../src/database/testDatabase"
import {SequelizeFoodProduct} from "../../src/database/db-models/SequelizeFoodProduct";
import {DatabaseDataSource} from "../../src/datasource/DatabaseDataSource";

chai.use(chaiHttp);
chai.should();

let datasource: DatabaseDataSource;

describe('searchBarcodeInDatabase', () => {
    before((done) => {
        //Before all tests, launch database
        testDatabase
            .sync({force: true})
            .then(() => {
                done()
            })
        datasource = new DatabaseDataSource()
    })

    beforeEach((done) => {
        //Before test, destroy all food products in the test database
        SequelizeFoodProduct.destroy(
            {
                where: {},
            }
        )
        done()
    })

    it('should return a foodproduct ',  async () => {
        //Setup
        const barcode: number = 7613404377888;
        let product = new SequelizeFoodProduct()
        product.eanBarcode = barcode.toString()
        try {
            //Wait for database to save product
            await product.save()
        } catch(e) {
            console.log(e)
        }

        //Let datasource search for barcode directly and wait for this
        const result = await datasource.searchBarcode(barcode)

        //Assertions
        result.should.be.an('Array')
        result.length.should.equal(1);
        result[0].eanBarcode.should.equal(barcode.toString());
    })

});
