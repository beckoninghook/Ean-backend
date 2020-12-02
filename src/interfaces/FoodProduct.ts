export interface FoodProduct{
    id: Number
    calories: Number
    carbohydrates: Number
    label: String
}

function getProducts(): Promise<FoodProduct[]>{
    return fetch('/api/v0/product/')
        .then(res => res.json())
        .then(res => {
            return res as FoodProduct[]
        })
}

