"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ReviewSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        unique: false,
        required: [true, "Please provide userId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide courseId"]
    },
    rating: {
        type: Number,
        required: [true, "Please provide rating"]
    },
    comment: { type: String }
}, { timestamps: true });
const Review = mongoose_1.default.model('Review', ReviewSchema);
exports.default = Review;
