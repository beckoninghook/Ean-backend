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

app.get("/product", (req, res) => {
    console.log(req.query.barcode);
    getEanProduct(req.query.barcode);
    //getFoodInformation(req.query.ean);
    res.json(data);
});

//This function will send out a http request to the api with the EAN code that's provided through the url
function getEanProduct(Ean) {
    var opts = {
        hostname: 'api.upcitemdb.com',
        path: '/prod/trial/lookup',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }
    var req = http.request(opts, function (res) {
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);
        res.on('data', function (d) {
            console.log('BODY: ' + d);
            data = JSON.parse(d).items[0];
        })
    })
    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    })
    req.write('{ "upc": "4002293401102" }')
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
