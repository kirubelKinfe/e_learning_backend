import express from 'express'
import { deleteFile } from '../controllers/files.controller'
const router = express.Router()

router.route('/')
    .post(deleteFile)

module.exports = router