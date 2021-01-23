import {FoodProduct} from "../../src/models/FoodProduct";
import {FoodRepoDataSource} from "../../src/datasource/FoodRepoDataSource";
import {it} from "mocha";

const request = require('request')
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const urlSearch = 'https://www.foodrepo.org/api/v3/products?barcodes='
const barcode = 7613404377888;
const dataSource = new FoodRepoDataSource();

describe('FoodRepo Tests', function () {
    // Dit is verkeerd, het moet FoodRepoDataSource testen, niet de FoodRepo API
    it('should give access denied without api key', function (done) {
        request.get({
                url: urlSearch + barcode.toString()
            },
            function (error, response, body) {

                expect(response.statusCode).to.equal(401);

                done();
            });
    });

    it('should give a foodproduct', function (done) {
        request.get({
                url: urlSearch + barcode.toString(), headers: {
                    'Authorization': 'Token token=d558bf263e21e34ad76c95c0f006d0de'
                }
            },
            function (error, response, body) {
                let _body = {};
                try {
                    _body = JSON.parse(body);
                } catch (e) {
                    _body = {};
                }

                expect(response.statusCode).to.equal(200);
                assert.notStrictEqual(_body, null, "should not be null");
                console.log(_body)
                done();
            });
    });

    it('should convert data', function (done) {
        request.get({
            url: urlSearch + barcode.toString(), headers: {
                'Authorization': 'Token token=d558bf263e21e34ad76c95c0f006d0de'
            }
        }, async function (error, response, body) {
            let _body;
            try {
                _body = JSON.parse(body);
                const converted = await dataSource.convertData(_body.data);
                console.log(converted[0]);
                expect(converted).to.be.a(FoodProduct);
            } catch (e) {
                _body = {};
            }

            done();
        });

    });

    it('should return a food product', async function(){
        let foodproduct = await dataSource.searchBarcode(barcode);
        console.log(foodproduct);
    });

});


