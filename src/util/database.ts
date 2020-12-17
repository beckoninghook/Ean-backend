import { Sequelize } from 'sequelize-typescript';


export const database = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    models: [User, Post],
});
