import express, {Express} from "express"
import bodyParser from "body-parser";

import foodProductRoutes from "./rest/routes/FoodProductRoutes"
import shareRoutes from "./rest/routes/ShareRoutes"

import errorResponse from "./middleware/ErrorResponse"
import {database} from "./database/database";
import {performance} from "perf_hooks";
import Config from "./config";

const app: Express = express();

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

const port: number = Config.DEFAULT_PORT; // default port to listen
const serverStartTimer: number = performance.now()

const launchRESTServer = () => {
    return app.listen(port, () => {
        const serverStartedTimer = performance.now()
        console.log(`Launched server on port ${port} in ${Math.round(((serverStartedTimer - serverStartTimer) +
            Number.EPSILON) * 100) / 100} milliseconds.`)
    });
}

const startApp = () => {
    database.authenticate()
        .then(() => {
            console.log("Connection can be established.")
            database
                .sync({alter: true})
                .then(() => {
                    return launchRESTServer()
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(() => {
            console.log("Could not establish connection to the database.")
        })
}

startApp()
