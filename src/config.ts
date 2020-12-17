import {DataSource} from "./interfaces/DataSource";
import {OpenFoodFactsDataSource} from "./data-source/OpenFoodFactsDataSource";
import {FoodRepoDataSource} from "./data-source/FoodRepoDataSource";

/*
* Add important configuration variables and functions here as they are needed.
* */

export default class Config {
    private static datasources: DataSource[]
    static DEFAULT_PORT: number = 8080;

    /**
     * Returns a list of all data sources.
     * Returns the initialized data sources or otherwise initializes them and returns them afterwards.
     */
    static useAllDataSources(): DataSource[] {
        if (this.datasources != null) {
            return this.datasources
        } else {
            //Add used data sources here
            this.datasources = [new OpenFoodFactsDataSource(),
                new FoodRepoDataSource()]
            console.log("Data sources have been initialized.")
            return this.datasources
        }
    }
}
