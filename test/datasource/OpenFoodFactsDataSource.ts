import {OpenFoodFactsDataSource} from "../../src/datasource/OpenFoodFactsDataSource";
import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import {SequelizeFoodProduct} from "../../src/database/db-models/SequelizeFoodProduct";

import fs from "fs";
import util from "util";
import * as path from "path";

chai.use(chaiHttp);
chai.should();
const dataSource = new OpenFoodFactsDataSource();

describe('OpenFoodFactsDataSource',  () => {
    it('returns a foodproduct',  async () => {
        const result = await dataSource.searchBarcode(3229820160672)
        result.should.be.an("array")
        result[0].label.should.equal("Croustillant chocolat")
    });

    it('converts data',  async () => {
        fs.readFile(path.join("test/testdata/openfoodfacts_test_data.json"), (data) => {
            dataSource.convertData(data)
                .then((result) => {
                    result.should.be.a("object")
                    result.should.be.a("FoodProduct")
                });

        })
    });

    it('should convert Kj to Kcal', () => {
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
