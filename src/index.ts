import express, {Express} from "express"
import { performance } from "perf_hooks"
import bodyParser from "body-parser";

import { database } from "./database/database";
import Config from "./config";

import foodProductRoutes from "./rest/routes/FoodProductRoutes"
import shareRoutes from "./rest/routes/ShareRoutes"

import errorResponse from "./middleware/ErrorResponse"

const serverStartTimer: number = performance.now()
const app: Express = express();
const port: number = Config.DEFAULT_PORT; // default port to listen

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/v1', foodProductRoutes)
app.use('/api/v1', shareRoutes)

app.use(errorResponse)

database
    .sync( {alter: true })
    .then(result => {
        console.log(result)
        app.listen(port, () => {
            const serverStartedTimer = performance.now()
            console.log(`Launched server on port ${port} in ${Math.round(((serverStartedTimer - serverStartTimer) +
                Number.EPSILON) * 100) / 100} milliseconds.`)
        });
    })
    .catch(error => {
        console.log(error)
    })



