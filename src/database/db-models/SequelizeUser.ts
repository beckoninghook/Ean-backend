import { Table, Column, Model } from 'sequelize-typescript';

@Table({
    tableName: "user",
    modelName: "user"
})
export class SequelizeUser extends Model<SequelizeUser> {
    @Column({primaryKey: true})
    userId: number

    @Column
    email: string
}
