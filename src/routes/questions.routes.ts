import express from 'express'
import { getQuestions, addQuestion, updateQuestion, deleteQuestion } from '../controllers/questions.controller'
const router = express.Router()

router.route('/')
    .get(getQuestions)
    .post(addQuestion)
    .put(updateQuestion)
    
router.route('/:questionId')    
    .delete(deleteQuestion)

module.exports = router