import {Table, Column, Model, PrimaryKey, Unique, addAttribute} from 'sequelize-typescript';
import {FoodProduct} from "../../models/FoodProduct";
import {DataType, DataTypes} from "sequelize";


/**
 * Model used by Sequelize to store FoodProduct objects in the database. This is not the same thing as a regular FoodProduct,
 * which is used to return data to the front-end.
 */
@Table({
    timestamps: false,
    tableName: "foodproduct",
    modelName: "foodproduct",
})
export class SequelizeFoodProduct extends Model<SequelizeFoodProduct> {

    @PrimaryKey
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

    @Column
    imageUrl: string

}

