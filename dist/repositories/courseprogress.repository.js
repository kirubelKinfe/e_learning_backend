"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class CourseProgressRepository {
    async GetCourseProgress(courseId, userId) {
        try {
            const courseProgress = await models_1.CourseProgress.findOne({ userId, courseId });
            if (!courseProgress) {
                throw new utils_1.ErrorResponse('Course progress not found.', 400);
            }
            return courseProgress;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateCourseProgress(courseId, userId, lectureId, progress) {
        try {
            const courseProgress = await models_1.CourseProgress.findOne({ userId, courseId });
            if (!courseProgress) {
                throw new utils_1.ErrorResponse("CourseProgress not found.", 400);
            }
            const { lectureProgress } = courseProgress;
            const lectureIndex = lectureProgress.findIndex((lp) => lp.lectureId.toString() === lectureId);
            if (lectureIndex === -1) {
                lectureProgress.push({ lectureId: lectureId, progress });
            }
            else {
                lectureProgress[lectureIndex].progress = progress;
            }
            const overallProgress = lectureProgress.reduce((acc, curr) => acc + curr.progress, 0) / lectureProgress.length;
            courseProgress.progress = overallProgress;
            await courseProgress.save();
            return lectureProgress;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = CourseProgressRepository;
