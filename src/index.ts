import * as express from "express"
import * as http from "http"
import Config from "./config";

const app = express();
const port = Config.DEFAULT_PORT; // default port to listen
let data: any;

//TODO: Clean up, separate things out into files and make it use the method exported from main-search.ts
// Make this file use main-search.ts and config.ts for querying the barcode.
//TODO: Create a config file/use some config library?

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/getProduct", async (req, res, next) => {
    getEanProduct(req.query.ean);
    res.json(data);
});

//This function will send out a http request to the api with the EAN code that's provided through the url
function getEanProduct(Ean) {
    var opts = {
        hostname: 'barcode.monster',
        path: '/api/' + Ean,
        method: 'GET',
    }
    var req = https.request(opts, function (res) {
        res.on('data', function (d) {
            var textChunk = d.toString('utf8');
            data = JSON.parse(textChunk);

        })
    })
    req.end()
}

//use this function to use the world open food api
function getFoodInformation(Ean) {
    //https://world.openfoodfacts.org/api/v0/product/
    var opts = {
        hostname: 'world.openfoodfacts.org',
        path: '/api/v0/product/' + Ean,
        method: 'GET',

        headers: {
            'connection': 'keep-alive',
            "Content-Type": "application/json",
        }
    }
    console.log(opts.hostname + opts.path);
    var req = http.request(opts, function (res) {

        res.on('data', function (d) {
            // console.log(d);


        })
    })

    req.end()
}
