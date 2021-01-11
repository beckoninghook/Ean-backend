import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';
import validateFoodProduct from '../utils/ValidateFoodProduct'

export class FoodRepoDataSource implements DataSource {
    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products?barcodes='

    private preferredLanguage = "en"

    //FoodRepo does not have anything that qualifies as a product tag
    private DEFAULT_TAG = "Product"

    private FIELD_BARCODE = "barcode"
    private FIELD_NAMES = "display_name_translations"

    private FIELD_NUTRIENTS = "nutrients"
    private FIELD_ENERGY_KCAL = "energy_kcal"
    private FIELD_CARBOHYDRATES = "carbohydrates"
    private FIELD_FAT = "fat"
    private FIELD_PROTEIN = "protein"
    private FIELD_PER_HUNDRED = "per_hundred"

    private FIELD_PRODUCT_QUANTITY = "quantity"

    private FIELD_IMAGES = "images"
    private PREFERRED_IMAGE_SIDE = "front"
    private PREFERRED_IMAGE_SIZE = "medium"


    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        try {
            let info = await axios.get(this.url + barcode.toString(), {
                headers: {
                    'Authorization': 'Token token=d558bf263e21e34ad76c95c0f006d0de'
                }
            })
            if (!info.data.data) {
                return []
            }
            const unconverted = info.data.data;
            if (unconverted.length == 0) {
                return []
            }
            return await this.convertData(unconverted);
        } catch (error) {
            console.log(error)
            return []
        }
    }

    convertData(data: any): Promise<FoodProduct[]> {
        try {
            const dataToConvert = data[0];
            if (!dataToConvert) {
                return Promise.resolve(Array())
            }
            //Find name
            let productname = dataToConvert[this.FIELD_NAMES][this.preferredLanguage]
            if (!productname) {
                const languagesAvailable = Object.keys(dataToConvert[this.FIELD_NAMES]);
                const language = languagesAvailable[0];
                productname = dataToConvert[this.FIELD_NAMES][language]
            }
            //Find image
            const images = dataToConvert[this.FIELD_IMAGES].find(images => images.categories[0].toLowerCase() == this.PREFERRED_IMAGE_SIDE)
            const imageUrl = images[this.PREFERRED_IMAGE_SIZE]
            //Build product
            const foodProduct = new FoodProduct(
                dataToConvert[this.FIELD_BARCODE],
                productname,
                dataToConvert[this.FIELD_NUTRIENTS][this.FIELD_ENERGY_KCAL][this.FIELD_PER_HUNDRED],
                dataToConvert[this.FIELD_NUTRIENTS][this.FIELD_CARBOHYDRATES][this.FIELD_PER_HUNDRED],
                dataToConvert[this.FIELD_NUTRIENTS][this.FIELD_FAT][this.FIELD_PER_HUNDRED],
                dataToConvert[this.FIELD_NUTRIENTS][this.FIELD_PROTEIN][this.FIELD_PER_HUNDRED],
                this.DEFAULT_TAG,
                dataToConvert[this.FIELD_PRODUCT_QUANTITY],
                imageUrl
            )
                    if (!validateFoodProduct(foodProduct)) {
            return Promise.resolve(Array())
        }
            return Promise.resolve(Array(
                foodProduct
            ));
        } catch (e) {
            console.log(e)
            return Promise.resolve(Array());
        }
    }
}
