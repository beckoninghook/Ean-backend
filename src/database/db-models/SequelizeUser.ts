import { Table, Column, Model } from 'sequelize-typescript';

/**
 * Sequelize model for a user.
 * Used to associate share records to users.
 */
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
