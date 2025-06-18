"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ModuleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    description: {
        type: String
    },
    lectures: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Lecture' }],
    quizzes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Quiz' }],
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide a courseId"]
    }
});
const Module = mongoose_1.default.model("Module", ModuleSchema);
exports.default = Module;
