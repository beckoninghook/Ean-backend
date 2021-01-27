import {testDatabase} from "../database/testDatabase";
import app from "../application";
import Config from "../config";
import {database} from "../database/database";
import {FoodProduct} from "../models/FoodProduct";
import {SequelizeFoodProduct} from "../database/db-models/SequelizeFoodProduct";

const createDemoProduct = async () => {
    await database.sync({force: true})
    await app.listen(Config.DEFAULT_PORT)
    const foodproduct = new FoodProduct(
        "8710871173070",
        "1de Beste Smeuige Pindakaas",
        662,
        9.4,
        58.6,
        20.9,
        "Spread",
        600,
        "https://i.imgur.com/BX4N3bA.jpg"
    )
    const foodproduct2 = new FoodProduct(
        "87172300",
        "Duo Penotti Cookies & Milk",
        558,
        52,
        37,
        4.1,
        "Spread",
        350,
        "https://i.imgur.com/kcJ2rRU.jpg"
    )
    const sequelizeFoodProduct = new SequelizeFoodProduct(foodproduct)
    const sequelizeFoodProduct2 = new SequelizeFoodProduct(foodproduct2)
    await sequelizeFoodProduct.save()
    await sequelizeFoodProduct2.save()
    console.log("Created demo food product")
}

createDemoProduct().then(() => {
    process.exit()
})
