import {FoodProduct} from "../../models/FoodProduct";
import {DataSource} from "../../interfaces/DataSource";
import Config from "../../config";
import {performance} from "perf_hooks"

/**
 *  Main function used by the GET endpoint on /foodproduct to query a barcode.
    It calls searchBarcode with the barcode in the query parameters and the
    list of datasources in the configuration.
 * @param req
 * @param res
 * @param next
 */
export const getBarcode = async (req, res, next) => {
    console.log("\nFoodProduct API: REQUEST START")
    try {
        const barcode = req.query.barcode;
        console.log(`Received a GET request on /api/foodproduct with barcode number: ${barcode}`)
        if (!req.query.barcode) {
            const errorThrown = new Error('Please provide a proper barcode in the request.')
            console.log("No barcode provided in request.")
            console.log("FoodProduct API: REQUEST END")
            const error = {
                errorThrown,
                statusCode: 404
            }
            next(error)
        }
        //Use the barcode in the request query parameters and all data sources provided in the configuration to search.
        const data = await searchBarcode(req.query.barcode, Config.useAllDataSources())
        if (data.length != 0) {
            console.log(`Successfully received ${data.length} results from data sources.`)
            console.log("FoodProduct API: REQUEST END")
            return res.status(200).send(data)
        } else {
            const errorThrown = new Error('Found no results for barcode: ' + barcode)
            console.log("Received no results from data sources.")
            console.log("FoodProduct API: REQUEST END")
            const error = {
                errorThrown,
                statusCode: 404,
            }
            next(error)
        }
    } catch (errorThrown) {
        const error = {
            errorThrown,
        }
       next(error)
    }
}

/**
 * This function takes a barcode and a list of objects implementing the DataSource interface.
 * Then it performs the interface's searchBarcode function on each DataSource in the list and adds
 * its value to an array. Finally, the results are returned with each FoodProduct found by the Datasources.
 * @param barcode
 * @param datasources
 */
async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const timer = performance.now()
    const results: FoodProduct[] = []
    for (let d of datasources) {
        const dataSourceTimer = performance.now()
        let dataSourceResults = await d.searchBarcode(barcode)
        console.log(dataSourceResults)
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







