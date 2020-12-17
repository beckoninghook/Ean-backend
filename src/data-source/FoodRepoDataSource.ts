import {DataSource} from "../interfaces/DataSource";
import {FoodProduct} from "../models/FoodProduct";
// @ts-ignore
import axios from 'axios';
import {request} from "express";


export class FoodRepoDataSource implements DataSource{
    
    dataSourceIndicator: string = "FoodRepo"
    url: String = 'https://www.foodrepo.org/api/v3/products/'
    apiKey: '052da85a97d58565de47584f7e516dcc'

    options = {
        url: 'https://www.foodrepo.org/api/v3/products/',
        headers: {'Authorization': 'Token token=052da85a97d58565de47584f7e516dcc'}
    };


    constructor() {
    }


    async searchBarcode(barcode: number): Promise<FoodProduct[]> {
        const data = await axios.get(this.options +'2030')
        if (data.data.status == 0) {
            return [];
        }
        return this.convertData(data.data.product);
    }

    convertData(data: any): FoodProduct[] {
        const foodProduct = new FoodProduct(
            data.product_name,
            data.calories,
            data.carbohydrates,
            data.fat,
            data.protein,
            data.tag,
            data.weight
        )
        console.log(foodProduct)
        return Array(
            foodProduct
        );
    }
}