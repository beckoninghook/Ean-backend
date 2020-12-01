import {FoodProduct} from "./models/FoodProduct";
import {DataSource} from "./interfaces/DataSource";

/*
    Main function used by the GET REST endpoint to query a barcode.
    Import this function and use it when the server receives a GET request for querying a barcode.
 */
export function searchBarcode(barcode: number, datasources: DataSource[]): FoodProduct[] {
    const results = []
    for (let d in datasources) {
        //use interface to search barcode
        //add to list of results
    }
    return results;
}
