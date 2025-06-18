"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DiscussionSchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Please provide author"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    textBody: {
        type: String,
        required: [true, "Please provide body"]
    },
    replies: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Reply' }]
}, { timestamps: true });
const Discussion = mongoose_1.default.model('Discussion', DiscussionSchema);
exports.default = Discussion;
