"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseprogress_controller_1 = require("../controllers/courseprogress.controller");
const router = express_1.default.Router();
router.route('/users/:userId/courses/:courseId')
    .get(courseprogress_controller_1.getCourseProgress)
    .put(courseprogress_controller_1.updateCourseProgress);
module.exports = router;
