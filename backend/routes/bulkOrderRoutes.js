import express from 'express'
const router = express.Router()
import {
    storeBulkOrder,
    verifyotp,
    bulkorderlist
} from '../controllers/bulkOrderController.js'

router.route('/').post(storeBulkOrder)
router.route('/otp').post(verifyotp)
router.route('/list').get(bulkorderlist)

export default router
