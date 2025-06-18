import express from 'express'
import { getLectures, getLectureWithId, addLecture, uploadVideoLecture, updateLecture, deleteLecture } from '../controllers/lectures.controller'
const router = express.Router()

router.route('/')
    .get(getLectures)
    .post(addLecture)
    .put(updateLecture)
    
router.route('/video-upload')
    .put(uploadVideoLecture)    
    
router.route('/:lectureId')
        .get(getLectureWithId)
        .delete(deleteLecture)

module.exports = router