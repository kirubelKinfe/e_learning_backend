"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuizSchema = new mongoose_1.default.Schema({
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    moduleId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Module',
        required: [true, "Please provide moduleId"]
    },
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    description: {
        type: String
    },
    questions: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Question' }]
}, { timestamps: true });
const Quiz = mongoose_1.default.model('Quiz', QuizSchema);
exports.default = Quiz;
