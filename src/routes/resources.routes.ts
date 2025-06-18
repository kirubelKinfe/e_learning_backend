import express from 'express'
import { getResources, addResource, deleteResource, updateResource } from '../controllers/resources.controller'
const router = express.Router()

router.route('/')
    .get(getResources)
    .post(addResource)
    .put(updateResource)

router.route('/:resourceId')    
    .delete(deleteResource)

module.exports = router