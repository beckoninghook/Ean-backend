import {FoodProduct} from "../models/FoodProduct";

/*
    Interface for various data sources. A data source can for example be the implementation of an API
    for searching a barcode. The purpose of this interface is so that various data sources can have different
    implementations, but the same basic interface that they stem from. This interface can then be used as an argument
    in methods that will need to use the data sources available and will call the methods on the interface generically.
 */
//TODO: Add methods as described on Trello.
export interface DataSource {
    searchBarcode: (barcode: number) => Promise<FoodProduct[]>;
    convertData: (data: any) => FoodProduct[]
}
