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
        const data = await axios.get(this.url + barcode.toString())
        if (data.data.status_verbose == this.STATUS_NOT_FOUND) {
            return [];
        }
        const unconvertedProduct = data.data.product
        return this.convertData(unconvertedProduct);
    }

    async convertData(data: any): Promise<FoodProduct[]> {
<<<<<<< HEAD
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
=======
        let tag = data[this.FIELD_TAG_1]
        if (!tag) {
            tag = data[this.FIELD_TAG_2]
            if (!tag) {
                tag = "Product"
            }
        }

        const foodProduct = new FoodProduct(
            data[this.FIELD_BARCODE],
            data[this.FIELD_LABEL],
            data[this.FIELD_NUTRIMENTS][this.FIELD_ENERGY_KCAL],
            data[this.FIELD_NUTRIMENTS][this.FIELD_CARBOHYDRATES],
            data[this.FIELD_NUTRIMENTS][this.FIELD_FAT],
            data[this.FIELD_NUTRIMENTS][this.FIELD_PROTEINS],
            tag,
            data[this.FIELD_QUANTITY],
            data[this.FIELD_IMAGE]
>>>>>>> a606a1627679c16e5b4d26fdb35567daffb1557d
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
