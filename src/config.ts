import {DataSource} from "./interfaces/DataSource";
import {UPCitemdb} from "./data-source/UPCitemdb";

/*
* Add important configuration variables and functions here as they are needed.
* */

export default class Config {
    static DEFAULT_PORT: number = 8080;

    static useAllDataSources(): DataSource[] {
        return new Array(
            new UPCitemdb(),
        )
    }
}
