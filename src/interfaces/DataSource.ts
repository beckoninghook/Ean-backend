import {FoodProduct} from "../models/FoodProduct";

export interface DataSource {
    searchBarcode: (barcode: number) => Promise<FoodProduct[]>;
}
