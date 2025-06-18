import express from 'express'
import { getReviews, addReview, updateReview, deleteReview, getCourseReviews } from '../controllers/reviews.controller'
const router = express.Router()

router.route('/')
    .get(getReviews)
    .post(addReview)
    .put(updateReview)
 
router.route('/:reviewId')    
    .delete(deleteReview)
    
router.route('/:courseId').get(getCourseReviews)

module.exports = router