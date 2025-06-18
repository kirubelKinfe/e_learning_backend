import express from 'express'
import { getCourseProgress, updateCourseProgress } from '../controllers/courseprogress.controller'
const router = express.Router()

router.route('/users/:userId/courses/:courseId')
        .get(getCourseProgress)
        .put(updateCourseProgress)
        

module.exports = router