import { Sequelize } from 'sequelize-typescript';
import { SequelizeFoodProduct } from "./db-models/SequelizeFoodProduct";

export const database = new Sequelize({
    database: 'ean-back-database',
    dialect: 'mysql',
    username: 'root',
    password: '',
    models: [__dirname + "/db-models"]
});
