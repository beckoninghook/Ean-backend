/*
    Main function used by the GET REST endpoint to query a barcode.
 */
export function searchBarcode(barcode: number, datasources: any[]): any[] {
    const results = []
    for (let d in datasources) {
        //use interface to search barcode
        //add to list of results
    }
    return results;
}
