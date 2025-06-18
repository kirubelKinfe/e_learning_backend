import express from 'express'
import { getCourses, getCourseById, getCourseByDepartment, createCourse, publishCourse, deleteCourse } from '../controllers/courses.controller'
import { updateCourseProgress, getCourseProgress } from '../controllers/courseprogress.controller'


const router = express.Router()

router.route('/')
        .get(getCourses)
        .post(createCourse)
        .put(publishCourse)

router.route('/:courseId')
        .get(getCourseById)
        .delete(deleteCourse)

router.route('/:department')
        .get(getCourseByDepartment)   

router.route('/:courseId/lectures/:lectureId/progress').put(updateCourseProgress)
router.route('/:courseId/progress').get(getCourseProgress)

module.exports = router