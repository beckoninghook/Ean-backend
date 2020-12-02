import express from "express"
import * as http from "http"
import Config from "./config";
import bodyParser from "body-parser";
import foodProductRoutes from "./rest/routes/FoodProductRoutes"

//TODO: Clean up, separate things out into files and make it use the method exported from FoodProductController.ts
// Make this file use FoodProductController.ts and config.ts for querying the barcode.
//TODO: Create a config file/use some config library?

const app = express();
const port = Config.DEFAULT_PORT; // default port to listen

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api', foodProductRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

