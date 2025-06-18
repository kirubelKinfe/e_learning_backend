"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionSchema = new mongoose_1.default.Schema({
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    moduleId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Module',
        required: [true, "Please provide moduleId"]
    },
    quizId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Quiz',
        required: [true, "Please provide quizId"]
    },
    title: {
        type: String,
        required: [true, "Plese provide title"]
    },
    answer: {
        type: String,
        required: [true, "Please provide answer"]
    },
    choices: [{
            type: {
                choice: { type: String }
            }
        }]
}, { timestamps: true });
const Question = mongoose_1.default.model('Question', QuestionSchema);
exports.default = Question;
