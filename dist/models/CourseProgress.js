"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseProgressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please provide userId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    lectureProgress: [{
            lectureId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Lecture',
                required: [true, "Please provide lectureId"]
            },
            progress: {
                type: Number,
                min: 0,
                max: 100,
                default: 0,
            },
        }],
    progress: {
        type: Number,
        default: 0
    },
    certificateUrl: {
        type: String,
        default: ''
    },
}, { timestamps: true });
const CourseProgress = mongoose_1.default.model('CourseProgress', courseProgressSchema);
exports.default = CourseProgress;
