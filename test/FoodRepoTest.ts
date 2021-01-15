import {FoodProduct} from "../src/models/FoodProduct";
import {FoodRepoDataSource} from "../src/datasource/FoodRepoDataSource";

var expect = require('chai').expect;
const assert = require('assert');

describe('searchBarcode', () => {
    it('should return a foodproduct ',function (done){
        var food = null;
        var result = new FoodRepoDataSource().searchBarcode(0);

        result.then(function (data){
            expect(data).to.equal(food);
            done();
        },function (error){
            assert.fail(error)
            done();
        });
    });
});


