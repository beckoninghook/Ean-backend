import {FoodProduct} from "../../models/FoodProduct";
import {DataSource} from "../../interfaces/DataSource";
import Config from "../../config";

/*
    Main function used by the GET REST endpoint to query a barcode.
    Import this function and use it when the server receives a GET request for querying a barcode.
    Use the configuration to get the list of datasources that have been implemented.
 */
export const getBarcode = async (req, res) => {
    console.log(`Received a GET request on /api/foodproduct with barcode number: ${req.query.barcode}`)
    const data = await searchBarcode(req.query.barcode, Config.useAllDataSources())
    if (data != null) {
        console.log("Successfully received data from API.")
    }
    res.status(200).send(data)
}


async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const results: FoodProduct[] = []
    for (let d of datasources) {
        let dataSourceResults = await d.searchBarcode(barcode)
        console.log(dataSourceResults)
        for (let result of dataSourceResults) {
            results.push(result)
        }
    }
    return results;
}







