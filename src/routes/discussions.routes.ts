import express from 'express'
import { getDiscussions, addDiscussion, updateDiscussion, deleteDiscussion } from '../controllers/discussions.controller'
const router = express.Router()

router.route('/')
    .get(getDiscussions)
    .post(addDiscussion)
    .put(updateDiscussion)
    
router.route('/:discussionId')    
    .delete(deleteDiscussion)

module.exports = router