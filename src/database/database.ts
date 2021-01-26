import { Sequelize } from 'sequelize-typescript';
import { SequelizeFoodProduct } from "./db-models/SequelizeFoodProduct";

/**
 * Config for production database
 */
export const database = new Sequelize({
    database: 'ean-backend-database',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [__dirname + "/db-models"]
});
