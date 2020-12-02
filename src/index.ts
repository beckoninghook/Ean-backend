const express = require("express");
const https = require("http");
const app = express();
const port = 8080; // default port to listen
let data: any;

//TODO: Clean up, separate things out into files and make it use the method exported from main-search.ts
//TODO: Create a config file/use some config library?

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/getProduct", (req, res, next) => {
    console.log(req.query.ean);
    getEanProduct(req.query.ean);
    //getFoodInformation(req.query.ean);
    res.json(data);
});

//This function will send out a http request to the api with the EAN code thats provided through the url
function getEanProduct(Ean) {
    var opts = {
        hostname: 'api.upcitemdb.com',
        path: '/prod/trial/lookup',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }
    var req = https.request(opts, function (res) {
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
    var req = https.request(opts, function (res) {

        res.on('data', function (d) {
            // console.log(d);


        })
    })

    req.end()
}
