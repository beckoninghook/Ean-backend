import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
// @ts-ignore
import axios from 'axios';

export class FoodRepoDataSource implements DataSource{

    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products'
    apiKey: 'a72bc81fa19d14402677050a0133b1bc'

    constructor() {
    }

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await axios.get(this.url + barcode.toString())
        if (data.data.status == 0) {
            return [];
        }
        return this.convertData(data.data.product);
    }

    convertData(data: any): FoodProduct[] {
        const foodProduct = new FoodProduct(
            data.product_name,
            data.calories,
            data.carbohydrates,
            data.fat,
            data.protein,
            data.tag,
            data.weight
        )
        console.log(foodProduct)
        return Array(
            foodProduct
        );
    }
}