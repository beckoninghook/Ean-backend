import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';

export class OpenFoodFactsDataSource implements DataSource {
    url: String = 'https://world.openfoodfacts.org/api/v0/product/'

    constructor() {
    }

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await axios.get(this.url + barcode.toString())
        const unconvertedProduct = data.data.product
        return this.convertData(unconvertedProduct);
    }

    //TODO: Change this when FoodProduct model grows
    convertData(data: any): FoodProduct[] {
        return Array(new FoodProduct(data.id,
            data.nutriments['energy-kcal'],
            data.nutriments.carbohydrates,
            data.labels));
    }
}
