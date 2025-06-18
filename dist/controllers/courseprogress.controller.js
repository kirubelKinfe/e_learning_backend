"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourseProgress = exports.getCourseProgress = void 0;
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("../services");
const service = new services_1.CourseProgressService();
// Get course progress
const getCourseProgress = async (req, res, next) => {
    const { userId, courseId } = req.params;
    try {
        const isCourseId = mongoose_1.default.Types.ObjectId.isValid(courseId);
        const isUserId = mongoose_1.default.Types.ObjectId.isValid(userId);
        if (isCourseId || isUserId) {
            const { data } = await service.GetCourseProgress(courseId, userId);
            return res.json(data);
        }
        else {
            throw new utils_1.ErrorResponse("Not a valid Id", 400);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getCourseProgress = getCourseProgress;
// Update lecture progress
const updateCourseProgress = async (req, res, next) => {
    const { userId, courseId } = req.params;
    const { lectureId, progress } = req.body;
    try {
        const { data } = await service.UpdateCourseProgress(courseId, userId, lectureId, progress);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCourseProgress = updateCourseProgress;
