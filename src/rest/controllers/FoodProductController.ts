import {FoodProduct} from "../../models/FoodProduct";
import {DataSource} from "../../interfaces/DataSource";
import Config from "../../config";

/*
    Main function used by the GET REST endpoint to query a barcode.
    Import this function and use it when the server receives a GET request for querying a barcode.
    Use the configuration to get the list of datasources that have been implemented.
 */
export const getBarcode = async (req, res) => {
    console.log("FoodProduct API: REQUEST START")
    const barcode = req.query.barcode;
    console.log(`Received a GET request on /api/foodproduct with barcode number: ${barcode}`)
    if (req.query.barcode == null) {
        const errorMessageNoBarcode = "Please provide a proper barcode in the request.";
        console.log("Received invalid barcode. Responding with message: " + errorMessageNoBarcode)
        console.log("FoodProduct API: REQUEST END")
        return res.status(400).send(errorMessageNoBarcode);
    }
    const data = await searchBarcode(req.query.barcode, Config.useAllDataSources())
    if (data.length != 0) {
        console.log(`Successfully received ${data.length} results from data sources.`)
        console.log("FoodProduct API: REQUEST END")
        return res.status(200).send(data)
    } else {
        console.log("Received no results from data sources.")
        console.log("FoodProduct API: REQUEST END")
        return res.status(404).send(`No results for barcode ${barcode}`)
    }
}


async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const results: FoodProduct[] = []
    for (let d of datasources) {
        let dataSourceResults = await d.searchBarcode(barcode)
        console.log(`Received ${dataSourceResults.length} results from data source: ${d.dataSourceIndicator}`)
        if (dataSourceResults.length != 0) {
            for (let result of dataSourceResults) {
                results.push(result)
            }
        }
    }
    return results;
}







