/**
 * Model for FoodProduct that will be returned to the frontend.
 * This model fits the expected response.
 */
export class FoodProduct {
    /**
     * Barcode of the food product
     */
    eanBarcode: string;

    /**
     * Label (name) of the food product.
     */
    label: string

    /**
     * Energy in kcal per 100g
     */
    calories: number

    /**
     * Carbohydrates per 100g
     */
    carbohydrates: number

    /**
     * Fat per 100g
     */
    fat: number

    /**
     * Protein per 100g
     */
    protein: number

    /**
     * Type of product. For example "meats"
     */
    tags: string

    /**
     * Weight in grams.
     */
    weight: number

    imageUrl: string

    constructor(eanBarcode: string,
                label: string,
                calories: number,
                carbohydrates: number,
                fat: number,
                protein: number,
                tags: string,
                weight: number,
                imageUrl: string) {
        this.eanBarcode = eanBarcode;
        this.label = label;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.protein = protein;
        this.tags = tags;
        this.weight = weight;
        this.imageUrl = imageUrl;
    }
}
