import { Table, Column, Model } from 'sequelize-typescript';

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
    @Column
    eanBarcode: number

    @Column
    label: string

    @Column
    calories: number

    @Column
    carbohydrates: number

    @Column
    fat: number

    @Column
    protein: number

    @Column
    tags: string

    @Column
    weight: number


}

