import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";


//TODO: Make this class functional by putting the code from index.ts into this file
export class UPCitemdb implements DataSource {
    //TODO: Add properties like the API url and other relevant information

    constructor() {
    }

    //TODO: Make this query the API and use convertData to make any data it receives converted into
    // A FoodProduct
    searchBarcode(barcode: number): Promise<FoodProduct[]> {
        return;
    }

    //TODO: Implement this so that whatever data it receives from the API is then turned into
    // FoodProduct objects
    convertData(data: any): FoodProduct[] {
        return;
    }
}
