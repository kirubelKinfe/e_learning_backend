import express from 'express'
import { addModule, getModules, updateModule, deleteModule } from '../controllers/modules.controller'
const router = express.Router()

router.route('/')
    .get(getModules)
    .post(addModule)
    .put(updateModule)

router.route('/:moduleId')
    .delete(deleteModule)

module.exports = router