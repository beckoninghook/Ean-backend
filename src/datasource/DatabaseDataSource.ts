import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import {SequelizeFoodProduct} from "../database/db-models/SequelizeFoodProduct";

// TODO: When searchBarcode is called, use sequelize to search for product where barcode matches. If not found, return empty array.
export class DatabaseDataSource implements DataSource {
    dataSourceIndicator = "EAN-Backend Database"



    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await SequelizeFoodProduct.findOne({where:{eanBarcode: barcode.toString()}})
        if (data) {
            return [data]
        } else {
            return []
        }
    }

    convertData(data: any): Promise<FoodProduct[]> {
        return Promise.resolve([])
    }
}
