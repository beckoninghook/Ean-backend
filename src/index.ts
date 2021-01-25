import {performance} from "perf_hooks";
import Config from "./config";

const port: number = Config.DEFAULT_PORT; // default port to listen
const serverStartTimer: number = performance.now()

import {database} from "./database/database"
import {testDatabase} from "./database/testDatabase"

import app from "./application"

export const setupDB = (isTestMode: boolean) => {
    let db = database;
    let syncOptions;
    if (isTestMode) {
        console.log("Connecting to test database.")
        db = testDatabase;
        syncOptions = {
            force: true,
        }
    } else {
        syncOptions = {
            alter: true,
        }
    }
    return database.authenticate()
        .then(() => {
            return db.sync(syncOptions)
        })
        .catch(() => {
            return Promise.reject("Could not connect to database.")
        })
}

const launch = () => {
    setupDB(false)
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

export default app;




