"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReplySchema = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Please provide author"]
    },
    discussionId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Discussion',
        required: [true, "Please provide discussionId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    textBody: {
        type: String,
        required: [true, "Please provide body"]
    },
    votes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true });
const Reply = mongoose_1.default.model('Reply', ReplySchema);
exports.default = Reply;
