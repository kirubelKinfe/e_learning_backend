import express from 'express'
import { getPrivateData } from '../controllers/private.controller'
import { authMiddleware } from '../middleware/authMiddleware'
const router = express.Router()

router.route('/').get(authMiddleware, getPrivateData)

module.exports = router