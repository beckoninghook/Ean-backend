import { Sequelize } from 'sequelize-typescript';
import {SequelizeFoodProduct} from "./db-models/SequelizeFoodProduct";

export const database = new Sequelize({
    database: 'ean-backend-database',
    dialect: 'mysql',
    username: 'root',
    password: 'password',
    models: [__dirname + "/db-models"]
});
