var express = require("express");
const https = require('https');
var bodyParser = require('body-parser');
var app = express();
let data;
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/getProduct", (req, res, next) => {
    console.log(req.query.ean);
    getEanProduct(req.query.ean);
    // getFoodInformation();
    res.json(data);
});

function getEanProduct(Ean) {
    var opts = {
        hostname: 'api.upcitemdb.com',
        path: '/prod/trial/lookup?upc=' + Ean,
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        }
    }

    var req = https.request(opts, function (res) {
        res.on('data', function (d) {
            data = JSON.parse(d).items[0];
        })
    })

    req.end()
}

// function getFoodInformation(Ean) {
//     //https://world.openfoodfacts.org/api/v0/product/
//     var opts = {
//         hostname: 'world.openfoodfacts.org',
//         path: '/api/v0/product/' + '5038862138390' + ".json",
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json",
//         }
//     }
//     console.log(opts.hostname + opts.path);
//     var req = https.request(opts, function (res) {
//         //console.log(res);
//         res.on('data', function (d) {
//             console.log(d);
//             data = JSON.parse(d);
//             console.log(data);
//         })
//     })

//     req.end()
// }