import {FoodProduct} from "../models/FoodProduct";

/*
    Interface for various data sources. A data source can for example be the implementation of an API
    for searching a barcode. The purpose of this interface is so that various data sources can have different
    implementations, but the same basic interface that they stem from. This interface can then be used as an argument
    in methods that will need to use the data sources available and will call the methods on the interface generically.
 */
/**
 * Interface for a DataSource. A DataSource is any source of data that can
 * take a barcode and return a foodproduct result. This means it can be a database, or some api,
 * or files that can be read.
 */
export interface DataSource {
    /**
     * Indicates the name of the DataSource.
     */
    dataSourceIndicator: string;

    /**
     * Takes a barcode and returns a promise of an array of FoodProduct objects.
     * @param barcode
     */
    searchBarcode: (barcode: number) => Promise<FoodProduct[]>;

    /**
     * Takes the data the data source would return normally, and converts it to the
     * FoodProduct model for uniformity.
     * @param data
     */
    convertData: (data: any) => FoodProduct[]
}
