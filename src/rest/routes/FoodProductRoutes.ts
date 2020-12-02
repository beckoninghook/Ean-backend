import * as express from "express";
import * as controller from "../controllers/FoodProductController"

const router = express.Router();

router.get('/foodproduct', controller.getBarcode);

export default router;
