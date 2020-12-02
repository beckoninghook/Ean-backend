import axios from 'axios';

/*
    Main function used by the GET REST endpoint to query a barcode.
    Import this function and use it when the server receives a GET request for querying a barcode.
    Use the configuration to get the list of datasources that have been implemented.
 */
export const getBarcode = async (req, res) => {
    console.log(`Received a GET request on /api/foodproduct with barcode number: ${req.query.barcode}`)
    const data = await getEanProduct(req.query.barcode);
    if (data != null) {
        console.log("Successfully received data from API.")
    }
    res.status(200).send(data)
}

async function getEanProduct(barcode) {
/*    var opts = {
        hostname: 'barcode.monster',
        path: '/api/' + barcode,
        method: 'GET',
    }*/
    /*    var req = http.request(opts, function (res) {
            res.on('data', function (d) {
                const textChunk = d.toString();
                data = JSON.parse(textChunk);
            })
        })
        req.end()*/
    const data = await axios.get('https://world.openfoodfacts.org/api/v0/product/' + barcode)
    return data.data
}

/*
async function searchBarcode(barcode: number, datasources: DataSource[]): Promise<FoodProduct[]> {
    const results: FoodProduct[] = []
    for (let d of datasources) {
        let dataSourceResults = await d.searchBarcode(barcode)
        for (let result of dataSourceResults) {
            results.push(result)
        }
    }
    return results;
}
*/






