import {FoodProduct} from "../models/FoodProduct";

const requiredFields: string[] = [
    "eanBarcode",
    "label",
    "calories",
    "carbohydrates",
    "fat",
    "protein",
    "tags",
    "weight",
]

const validateFoodProduct = (foodproduct: FoodProduct): boolean => {
    const keys = Object.keys(foodproduct);
    const missingKeys = []
    for (let i = 0; i < requiredFields.length; i++) {
        if (!keys.includes(requiredFields[i], 0) || !foodproduct[requiredFields[i]]) {
            missingKeys.push(i)
            console.log("Result is missing a required FoodProduct attribute: " + requiredFields[i])
        }
    }
    return missingKeys.length < 1;
}
export default validateFoodProduct
