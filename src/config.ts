import {DataSource} from "./interfaces/DataSource";
import {OpenFoodFactsDataSource} from "./data-source/OpenFoodFactsDataSource";

/*
* Add important configuration variables and functions here as they are needed.
* */

export default class Config {
    private static datasources: DataSource[]
    static DEFAULT_PORT: number = 8080;

    static useAllDataSources(): DataSource[] {
        if (this.datasources != null) {
            return this.datasources
        } else {
            this.datasources = new Array(
                new OpenFoodFactsDataSource(),
            )
            console.log("Data sources have been initialized.")
            return this.datasources
        }
    }
}
