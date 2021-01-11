import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import axios from 'axios';
import {waitForDebugger} from "inspector";

// @ts-ignore


export class FoodRepoDataSource implements DataSource {

    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products?barcodes='

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

    validateFoodProduct(data: any): boolean{
        return !(data[0].nutrients.energy_kcal.per_hundred == null || data[0].nutrients.carbohydrates.per_hundred == null ||
            data[0].nutrients.fat.per_hundred == null || data[0].nutrients.protein.per_hundred == null || data[0].display_name_translations.en == null ||
            data[0].quantity == null);

    }


    convertData(data: any): Promise<FoodProduct[]> {
        const foodProduct = new FoodProduct(
            data[0].barcode,
            data[0].name_translations.en,
            data[0].nutrients.energy_kcal.per_hundred,
            data[0].nutrients.carbohydrates.per_hundred,
            data[0].nutrients.fat.per_hundred,
            data[0].nutrients.protein.per_hundred,
            data[0].display_name_translations.en,
            data[0].quantity,
            data[0].images[0].medium
        )
        if(!this.validateFoodProduct(data)){
            return Promise.resolve(Array())
        }
        console.log(foodProduct)
        return Promise.resolve(Array(
            foodProduct
        ));
    }
}
