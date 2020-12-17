import { Sequelize } from 'sequelize-typescript';

export const database = new Sequelize({
    database: 'ean-backend-database',
    dialect: 'mysql',
    username: 'root',
    password: 'password',
    models: ["./database/db-models"]
});
