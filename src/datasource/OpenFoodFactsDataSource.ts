import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';
import validateFoodProduct from "../utils/ValidateFoodProduct"

export class OpenFoodFactsDataSource implements DataSource {
    dataSourceIndicator: string = "Open Food Facts"
    url: String = 'https://world.openfoodfacts.org/api/v0/product/'

    private STATUS_NOT_FOUND = "product not found"

    private FIELD_BARCODE = "_id"
    private FIELD_LABEL = "product_name"

    private FIELD_NUTRIMENTS = "nutriments"
    private FIELD_ENERGY_KCAL = "energy-kcal_100g"
    private FIELD_ENERGY_KJ = "energy-kj_100g"
    private FIELD_CARBOHYDRATES = "carbohydrates_100g"
    private FIELD_FAT = "fat_100g"
    private FIELD_PROTEINS = "proteins_100g"

    private FIELD_TAG_1 = "pnns_group_1"
    private FIELD_TAG_2 = "pnns_group_2"

    private FIELD_QUANTITY = "product_quantity"

    private FIELD_IMAGE = "image_url"

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const url = this.url + barcode.toString()
        const data = await axios.get(url)
        if (data.data.status_verbose == this.STATUS_NOT_FOUND) {
            return [];
        }
        const unconvertedProduct = data.data.product
        return this.convertData(unconvertedProduct);
    }

    async convertData(data: any): Promise<FoodProduct[]> {
        if (!data) {
            return Promise.resolve(Array())
        }
        let tag = data[this.FIELD_TAG_1]
        if (!tag) {
            tag = data[this.FIELD_TAG_2]
            if (!tag) {
                tag = "Product"
            }
        }
        let kcal: number = data[this.FIELD_NUTRIMENTS][this.FIELD_ENERGY_KCAL];

        if (!data[this.FIELD_NUTRIMENTS][this.FIELD_ENERGY_KCAL]) {
            kcal = this.convertKJtoKCAL(data[this.FIELD_NUTRIMENTS][this.FIELD_ENERGY_KJ]);
        }

        const foodProduct = new FoodProduct(
            data[this.FIELD_BARCODE],
            data[this.FIELD_LABEL],
            kcal,
            data[this.FIELD_NUTRIMENTS][this.FIELD_CARBOHYDRATES],
            data[this.FIELD_NUTRIMENTS][this.FIELD_FAT],
            data[this.FIELD_NUTRIMENTS][this.FIELD_PROTEINS],
            tag,
            data[this.FIELD_QUANTITY],
            data[this.FIELD_IMAGE]
        )

        if (!validateFoodProduct(foodProduct)) {
            return Promise.resolve(Array())
        }

        return Promise.resolve(Array(foodProduct))
    }

    
    /*
    * 1 kj to kcal = 0.2389 kcal
    */
    convertKJtoKCAL(kjres: number) {
        const KCAL_MULTIPLIER: number = 0.2389;
        return kjres * KCAL_MULTIPLIER
    }

}
