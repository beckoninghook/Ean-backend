import {FoodProduct} from "../src/models/FoodProduct";
import {FoodRepoDataSource} from "../src/datasource/FoodRepoDataSource";

const assert = require('assert');
const { foodProduct } = require('../src/models/FoodProduct')

function asyncMethod(){
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    })
}

describe('searchBarcode', () => {
    it('should return a foodproduct ',  async function (){

    });
});


