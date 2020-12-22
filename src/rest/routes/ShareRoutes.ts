import * as express from "express"
import * as controller from "../controllers/ShareController"

const router = express.router()

router.post('/share', controller.saveShareRecord);

export default router;
