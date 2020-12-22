import { Table, Column, Model } from 'sequelize-typescript';


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

