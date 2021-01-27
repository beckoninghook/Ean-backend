import {performance} from "perf_hooks";
import Config from "./config";

const port: number = Config.DEFAULT_PORT; // default port to listen
const serverStartTimer: number = performance.now()

import {database} from "./database/database"

import app from "./application"

export const setupDB = () => {
    return database.authenticate()
        .then(() => {
            return database.sync({
                alter: true,
            })
        })
        .catch(() => {
            return Promise.reject("Could not connect to database.")
        })
}

const launch = () => {
    setupDB()
        .then(() => {
            console.log("Connected to database.")
            app.listen(port, () => {
                const serverStartedTimer = performance.now()
                console.log(`Launched server on port ${port} in ${Math.round(((serverStartedTimer - serverStartTimer) +
                    Number.EPSILON) * 100) / 100} milliseconds.`)
            });
        })
        .catch((e) => {
            console.log(e)
        })
}

launch()



