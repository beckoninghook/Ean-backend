import * as express from "express"
import * as controller from "../controllers/ShareController"

const router = express.Router()

router.post('/share', controller.saveShareRecord);

router.get('/share', controller.countShareRecordsForUser)
router.get('/share/:id', controller.countShareRecordsForUser)

export default router;
