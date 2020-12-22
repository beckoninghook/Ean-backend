import {Table, Column, Model, PrimaryKey, Unique, addAttribute} from 'sequelize-typescript';
import {FoodProduct} from "../../models/FoodProduct";
import {DataType, DataTypes} from "sequelize";



@Table({
    timestamps: false,
    tableName: "foodproduct",
    modelName: "foodproduct",
})
export class SequelizeFoodProduct extends Model<SequelizeFoodProduct> {

    @Unique
    @Column
    eanBarcode: string

    @Column
    label: string

    @Column({type: DataTypes.FLOAT})
    calories: number

    @Column({type: DataTypes.FLOAT})
    carbohydrates: number

    @Column({type: DataTypes.FLOAT})
    fat: number

    @Column({type: DataTypes.FLOAT})
    protein: number

    @Column
    tags: string

    @Column
    weight: number

}

