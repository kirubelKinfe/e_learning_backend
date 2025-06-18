"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VoteSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: [true, "Please provide userId"]
    },
    discussionId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Discussion',
        required: [true, "Please provide discussionId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    replyId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Reply',
        required: [true, "Please provide replyId"]
    },
    vote: {
        type: Boolean,
        required: [true, "Please provide voteType"]
    }
}, { timestamps: true });
const Vote = mongoose_1.default.model('Vote', VoteSchema);
exports.default = Vote;
