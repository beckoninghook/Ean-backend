/*
    Model for the FoodProduct that will be passed on to the front-end through the GET REST endpoint.
 */
export class FoodProduct {
    id: Number
    calories: Number
    carbohydrates: Number
    label: String

    constructor(id: Number, calories: Number, carbohydrates: Number, label: String) {
        this.id = id;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.label = label;
    }

}
