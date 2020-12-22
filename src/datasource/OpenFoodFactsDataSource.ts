import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';
import {SequelizeFoodProduct} from "../database/db-models/SequelizeFoodProduct";
import {getBarcode} from "../rest/controllers/FoodProductController";

export class OpenFoodFactsDataSource implements DataSource {
    dataSourceIndicator: string = "Open Food Facts"
    url: String = 'https://world.openfoodfacts.org/api/v0/product/'
    apiKey: String = ''

    constructor() {
    }

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await axios.get(this.url + barcode.toString())
        if (data.data.status == 0) {
            return [];
        }
        const unconvertedProduct = data.data.product
        return this.convertData(unconvertedProduct);
    }

    convertData(data: any): FoodProduct[] {
        console.log(data)
        const foodProduct = new FoodProduct(
            data._id,
            data.product_name,
            data.nutriments['energy-kcal_100g'],
            data.nutriments.carbohydrates_100g,
            data.nutriments.fat_100g,
            data.nutriments.proteins_100g,
            data.pnns_groups_2,
            data.product_quantity
        )
        //writing it to database. Maybe there is a better place to this.
        const foodData = new SequelizeFoodProduct(foodProduct);
        foodData.save()
        console.log(foodProduct)
        return Array(
            foodProduct
        );
    }

}
