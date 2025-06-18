import express from 'express'
import { getVotes, addVote, deleteVote } from '../controllers/votes.controller'
const router = express.Router()

router.route('/')
    .get(getVotes)
    .post(addVote)

router.route('/:voteId')    
    .delete(deleteVote)

module.exports = router