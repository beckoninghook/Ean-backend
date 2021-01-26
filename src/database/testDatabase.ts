import {Sequelize} from "sequelize-typescript";

/**
 * Config for test database
 */
export const testDatabase = new Sequelize({
    database: 'ean-backend-test-database',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [__dirname + "/db-models"]
});
