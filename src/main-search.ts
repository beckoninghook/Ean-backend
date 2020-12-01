import {FoodProduct} from "./models/FoodProduct";
import {DataSource} from "./interfaces/DataSource";

/*
    Main function used by the GET REST endpoint to query a barcode.
    Import this function and use it when the server receives a GET request for querying a barcode.
 */
export async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const results: FoodProduct[] = []
    for (let d of datasources) {
        let dataSourceResults = await d.searchBarcode(barcode)
        for (let result of dataSourceResults) {
            results.push(result)
        }
    }
    return results;
}
