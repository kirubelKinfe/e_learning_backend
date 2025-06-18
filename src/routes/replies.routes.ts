import express from 'express'
import { getReplies, addReply, updateReply, deleteReply } from '../controllers/replies.controller'
const router = express.Router()

router.route('/')
    .get(getReplies)
    .post(addReply)
    .put(updateReply)

router.route('/:replyId')    
    .delete(deleteReply)

module.exports = router