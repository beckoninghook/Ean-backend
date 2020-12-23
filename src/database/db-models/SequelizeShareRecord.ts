import {Table, Column, Model, CreatedAt, BelongsTo} from "sequelize-typescript"
import {SequelizeUser} from "./SequelizeUser";

/**
 * Sequelize entity used to track when a share was done on the mobile application.
 * It tracks the user that initiated the share as well as the time at which it happened.
 */
@Table({
    tableName: "sharerecord",
    modelName: "sharerecord"
})
export class SequelizeShareRecord extends Model<SequelizeShareRecord> {
    @CreatedAt
    timestamp: Date;

    @BelongsTo(() => SequelizeUser, 'userId')
    user: SequelizeUser
}
