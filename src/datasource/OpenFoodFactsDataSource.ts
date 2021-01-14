import { DataSource } from "../interfaces/DataSource";
import { FoodProduct } from "../models/FoodProduct";
import axios from 'axios';
import { SequelizeFoodProduct } from "../database/db-models/SequelizeFoodProduct";

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

    async convertData(data: any): Promise<FoodProduct[]> {
        var kcal: number = data.nutriments['energy-kcal_100g'];

        if (!data.nutriments['energy-kcal_100g']) {
            kcal = this.convertKJtoKCAL(data.nutriments['energy-kj_100g']);
        }

        const foodProduct = new FoodProduct(
            data._id,
            data.product_name,
            kcal,
            data.nutriments.carbohydrates_100g,
            data.nutriments.fat_100g,
            data.nutriments.proteins_100g,
            data.pnns_groups_2,
            data.product_quantity,
            data.image_url
        )

        return Array(
            foodProduct
        );
    }

    
    /*
    * 1 kj to kcal = 0.2389 kcal
    */
    convertKJtoKCAL(kjres: number) {
        const KCAL_MULTIPLIER: number = 0.2389;
        return kjres * KCAL_MULTIPLIER
    }

}
