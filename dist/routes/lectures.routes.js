"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lectures_controller_1 = require("../controllers/lectures.controller");
const router = express_1.default.Router();
router.route('/')
    .get(lectures_controller_1.getLectures)
    .post(lectures_controller_1.addLecture)
    .put(lectures_controller_1.updateLecture);
router.route('/video-upload')
    .put(lectures_controller_1.uploadVideoLecture);
router.route('/:lectureId')
    .get(lectures_controller_1.getLectureWithId)
    .delete(lectures_controller_1.deleteLecture);
module.exports = router;
