import {Table, Column, Model, CreatedAt, BelongsTo} from "sequelize-typescript"
import {SequelizeUser} from "./SequelizeUser";

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
