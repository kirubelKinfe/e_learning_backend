import express from 'express'
import { addQuiz, updateQuiz, deleteQuiz, getQuizzes } from '../controllers/quizzes.controller'
const router = express.Router()

router.route('/')
    .get(getQuizzes)
    .post(addQuiz)
    .put(updateQuiz)

router.route('/:quizId')    
    .delete(deleteQuiz)

module.exports = router