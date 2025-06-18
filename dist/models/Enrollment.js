"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnrollmentSchema = new mongoose_1.default.Schema({
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Please provide userId"]
    }
}, { timestamps: true });
const Enrollment = mongoose_1.default.model("Enrollment", EnrollmentSchema);
exports.default = Enrollment;
