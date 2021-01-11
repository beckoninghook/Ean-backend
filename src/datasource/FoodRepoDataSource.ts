import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';

// @ts-ignore


export class FoodRepoDataSource implements DataSource {
    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products?barcodes='

    private preferredLanguage = "en"

    //FoodRepo does not have anything that qualifies as a product tag
    private defaultTag = "Product"

    private barcodeField = "barcode"
    private nameTranslationsField = "display_name_translations"

    private nutrientsField = "nutrients"
    private caloriesKcalField = "energy_kcal"
    private carbohydratesField = "carbohydrates"
    private fatField = "fat"
    private proteinField = "protein"
    private perHundredField = "per_hundred"

    private quantityField = "quantity"

    private imagesField = "images"
    private preferredImageSide = "front"
    private preferredImageSize = "medium"


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
            let productname = dataToConvert[this.nameTranslationsField][this.preferredLanguage]
            if (!productname) {
                const languagesAvailable = Object.keys(dataToConvert[this.nameTranslationsField]);
                const language = languagesAvailable[0];
                productname = dataToConvert[this.nameTranslationsField][language]
            }
            const images = dataToConvert[this.imagesField].find(images => images.categories[0].toLowerCase() == this.preferredImageSide)
            const imageUrl = images[this.preferredImageSize]
            const foodProduct = new FoodProduct(
                dataToConvert[this.barcodeField],
                productname,
                dataToConvert[this.nutrientsField][this.caloriesKcalField][this.perHundredField],
                dataToConvert[this.nutrientsField][this.carbohydratesField][this.perHundredField],
                dataToConvert[this.nutrientsField][this.fatField][this.perHundredField],
                dataToConvert[this.nutrientsField][this.proteinField][this.perHundredField],
                this.defaultTag,
                dataToConvert[this.quantityField],
                imageUrl
            )
            return Promise.resolve(Array(
                foodProduct
            ));
        } catch (e) {
            console.log(e)
            return Promise.resolve(Array());
        }
    }
}
