"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LectureSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String,
        default: ""
    },
    article: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    public_id: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 0
    },
    moduleId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Module',
        required: [true, "Please provide a moduleId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide a courseId"]
    },
    resources: [{
            type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Resource'
        }]
}, { timestamps: true });
const Lecture = mongoose_1.default.model("Lecture", LectureSchema);
exports.default = Lecture;
