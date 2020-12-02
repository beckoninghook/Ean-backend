const express = require("express");
var https = require('follow-redirects').http;
const app = express();
const port = 8080; // default port to listen
let data: any;

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/getProduct", async (req, res, next) => {
    getEanProduct(req.query.ean);
    res.json(data);
});

//This function will send out a http request to the api with the EAN code thats provided through the url
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
    var req = https.request(opts, function (res) {

        res.on('data', function (d) {
            // console.log(d);


        })
    })

    req.end()
}
