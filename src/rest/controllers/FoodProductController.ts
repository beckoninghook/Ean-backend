import {FoodProduct} from "../../models/FoodProduct";
import {DataSource} from "../../interfaces/DataSource";
import Config from "../../config";
import {performance} from "perf_hooks"

/*
    Main function used by the GET REST endpoint to query a barcode.
    The function calls searchBarcode() with the barcode in the query parameters and the
    list of datasources in the config.
 */
export const getBarcode = async (req, res) => {
    console.log("\nFoodProduct API: REQUEST START")
    const barcode = req.query.barcode;
    console.log(`Received a GET request on /api/foodproduct with barcode number: ${barcode}`)
    if (req.query.barcode == null) {
        const errorMessageNoBarcode = "Please provide a proper barcode in the request.";
        console.log(`Received invalid barcode. Responding with message: ${errorMessageNoBarcode}`)
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
        return res.status(404).send(`No results for barcode ${barcode}.`)
    }
}


async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const timer = performance.now()
    const results: FoodProduct[] = []
    for (let d of datasources) {
        const dataSourceTimer = performance.now()
        let dataSourceResults = await d.searchBarcode(barcode)
        const dataSourceTimerEnd = performance.now()
        console.log(`Received ${dataSourceResults.length} results from data source: ${d.dataSourceIndicator} in ${Math.round(((dataSourceTimerEnd - dataSourceTimer) + Number.EPSILON) * 100) / 100} milliseconds.`)
        if (dataSourceResults.length != 0) {
            for (let result of dataSourceResults) {
                results.push(result)
            }
        }
    }
    const timerEnd = performance.now()
    console.log(`Search took ${Math.round(((timerEnd - timer) +
        Number.EPSILON) * 100) / 100} milliseconds in total.`)
    return results;
}







