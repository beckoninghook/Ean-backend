import {Table, Column, Model, CreatedAt} from "sequelize-typescript"

@Table({
    tableName: "sharerecord",
    modelName: "sharerecord"
})
export class SequelizeShareRecord extends Model<SequelizeShareRecord> {
    @CreatedAt
    timestamp: Date;
}
