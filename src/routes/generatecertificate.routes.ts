import express from 'express'
import { generateCertificate } from '../controllers/generatecertificate.controller'
const router = express.Router()

router.route('/')
        .post(generateCertificate)

module.exports = router