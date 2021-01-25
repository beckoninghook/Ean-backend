import {Sequelize} from "sequelize-typescript";

export const testDatabase = new Sequelize({
    database: 'ean-backend-test-database',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [__dirname + "/db-models"]
});
