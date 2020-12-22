import * as express from "express"
import * as controller from "../controllers/ShareController"

const router = express.Router()

router.post('/share', controller.saveShareRecord);

export default router;
