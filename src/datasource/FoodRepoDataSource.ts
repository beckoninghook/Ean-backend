import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";

export class FoodRepoDataSource implements DataSource {
    dataSourceIndicator: string = "Test";

    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const nepFoodProduct = {
            eanNep : '45645654',
            labelNep: "Geisha suklaamousseleivos",
            caloriesNep: 437,
            carbohydratesNep: 35,
            fatNep: 32,
            proteinA: 4.3,
            tagsA: "Biscuits and cakes",
            weightA: "160"
        }
        return this.convertData(nepFoodProduct)
    }

    convertData(data: any): FoodProduct[] {
        const foodProduct = new FoodProduct(
            data.eanNep,
            data.labelNep,
            data.caloriesNep,
            data.carbohydratesNep,
            data.fatNep,
            data.proteinA,
            data.tagsA,
            data.weightA
        )
        return Array(foodProduct);
    }
}
