import express from 'express'
import { addEnrollment, deleteEnrollment, getEnrollments, getEnrollment } from '../controllers/enrollments.controller'
const router = express.Router()

router.route('/')
        .get(getEnrollments)
        .post(addEnrollment)
        
router.route('/:enrollmentId')        
        .delete(deleteEnrollment)

router.route('/users/:userId/courses/:courseId')
        .get(getEnrollment)
module.exports = router