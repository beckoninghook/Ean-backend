import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';
import {SequelizeFoodProduct} from "../database/db-models/SequelizeFoodProduct";

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
        //Writing it to the database. Maybe there is a better place to this.
        //foodData.save();
        const foodData = new SequelizeFoodProduct(foodProduct);
        let food = await SequelizeFoodProduct.findOne({where: {eanBarcode: foodProduct.eanBarcode}})
        if (!food) {
            foodData.save();
        }
        return Array(
            foodProduct
        );
    }

}
