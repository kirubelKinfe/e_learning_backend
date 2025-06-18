"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ResourceSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, "Please provide title"]
    },
    url: {
        type: String,
        required: [true, "Please provide url"]
    },
    public_id: {
        type: String,
        required: [true, "Please provide public_id"]
    },
    lectureId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Lecture',
        required: [true, "Please provide lectureId"]
    },
    moduleId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Module',
        required: [true, "Please provide a moduleId"]
    },
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course',
        required: [true, "Please provide a courseId"]
    }
}, { timestamps: true });
const Resource = mongoose_1.default.model('Resource', ResourceSchema);
exports.default = Resource;
