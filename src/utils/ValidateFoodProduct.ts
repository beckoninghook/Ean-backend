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
    for (let i = 0; i < requiredFields.length; i++) {
        if (!keys.includes(requiredFields[i], 0) || !foodproduct[requiredFields[i]]) {
            return false;
        }
    }
    return true;
}

export default validateFoodProduct
