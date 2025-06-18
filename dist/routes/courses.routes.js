"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_controller_1 = require("../controllers/courses.controller");
const courseprogress_controller_1 = require("../controllers/courseprogress.controller");
const router = express_1.default.Router();
router.route('/')
    .get(courses_controller_1.getCourses)
    .post(courses_controller_1.createCourse)
    .put(courses_controller_1.publishCourse);
router.route('/:courseId')
    .get(courses_controller_1.getCourseById)
    .delete(courses_controller_1.deleteCourse);
router.route('/:department')
    .get(courses_controller_1.getCourseByDepartment);
router.route('/:courseId/lectures/:lectureId/progress').put(courseprogress_controller_1.updateCourseProgress);
router.route('/:courseId/progress').get(courseprogress_controller_1.getCourseProgress);
module.exports = router;
