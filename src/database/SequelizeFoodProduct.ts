import { Table, Column, Model, HasMany } from 'sequelize-typescript';


@Table
class SequelizeFoodProducts {

    @Column
    name: string;

    @Column
    birthday: Date;

    @HasMany(() => Hobby)
    hobbies: Hobby[];
}

export class SequelizeFoodProducts;