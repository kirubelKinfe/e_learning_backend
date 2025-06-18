"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enrollments_controller_1 = require("../controllers/enrollments.controller");
const router = express_1.default.Router();
router.route('/')
    .get(enrollments_controller_1.getEnrollments)
    .post(enrollments_controller_1.addEnrollment);
router.route('/:enrollmentId')
    .delete(enrollments_controller_1.deleteEnrollment);
router.route('/users/:userId/courses/:courseId')
    .get(enrollments_controller_1.getEnrollment);
module.exports = router;
