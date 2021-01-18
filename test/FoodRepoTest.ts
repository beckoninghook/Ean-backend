import {FoodProduct} from "../src/models/FoodProduct";
import {FoodRepoDataSource} from "../src/datasource/FoodRepoDataSource";
import {it} from "mocha";

const request = require('request')
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const urlSearch = 'https://www.foodrepo.org/api/v3/products?barcodes='
const barcode = 7613404377888;



describe('FoodRepo Tests', function (){
    it('should give acces denied without api key', function (done){
        request.get({
            url: urlSearch + barcode.toString()
        },
            function (error,respone,body){
                let _body = {};
                try{
                _body = JSON.parse(body);
            }
            catch (e){
                _body = {};
            }

            expect(respone.statusCode).to.equal(401);

            done();
            });
    });

    it('should give a foodproduct',function (done){
        request.get({
                url: urlSearch + barcode.toString(),headers: {
                    'Authorization': 'Token token=d558bf263e21e34ad76c95c0f006d0de'
                }
            },
            function (error,respone,body){
                let _body = {};
                try{
                    _body = JSON.parse(body);
                }
                catch (e){
                    _body = {};
                }

                expect(respone.statusCode).to.equal(200);
                assert.notStrictEqual(_body,null, "should not be null");
                console.log(_body)
                done();
            });
    });

})


