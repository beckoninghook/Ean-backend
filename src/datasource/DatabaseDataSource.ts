import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
import {SequelizeFoodProduct} from "../database/db-models/SequelizeFoodProduct";

/**
 * Implementation of the DataSource interface using a Sequelize database connection for data
 */
export class DatabaseDataSource implements DataSource {
    dataSourceIndicator = "EAN-Backend Database"

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await SequelizeFoodProduct.findOne({
            where: {
                eanBarcode: barcode.toString()
            }
        })
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
