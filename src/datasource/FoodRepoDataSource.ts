import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
// @ts-ignore


export class FoodRepoDataSource implements DataSource{
    
    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products?barcode='

    constructor() {
    }

    delay() {
        // `delay` returns a promise
        return new Promise(function(resolve, reject) {
            // Only `delay` is able to resolve or reject the promise
            setTimeout(function() {
                resolve(42); // After 3 seconds, resolve the promise with value 42
            }, 3000);
        });
    }


    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        try {
            const options = {
                url: 'https://www.foodrepo.org/api/v3/products?barcodes=' + barcode.toString(),
                headers: {'Authorization': 'Token token=d558bf263e21e34ad76c95c0f006d0de'}
            };
            const request = require('request');
            let info = request.get(options, function(error, response, body){
                     info = JSON.parse(body);
                 })
            await this.delay();
            const unconverted = info.data;
            console.log(unconverted);
            return await this.convertData(unconverted);
        }catch (error){
            return null;
        }
    }


    convertData(data: any): FoodProduct[] {
        const foodProduct = new FoodProduct(
            data[0].name_translations.en,
            data[0].nutrients.energy_kcal.per_hundred,
            data[0].nutrients.carbohydrates.per_hundred,
            data[0].nutrients.fat.per_hundred,
            data[0].nutrients.protein.per_hundred,
            data[0].display_name_translations.en,
            data[0].quantity
        )
        console.log(foodProduct)
        return Array(
            foodProduct
        );
    }
}