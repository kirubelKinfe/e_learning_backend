"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class CourseProgressService {
    constructor() {
        this.repository = new repositories_1.CourseProgressRepository();
    }
    async GetCourseProgress(courseId, userId) {
        try {
            const courseprogress = await this.repository.GetCourseProgress(courseId, userId);
            return (0, utils_1.FormateData)({ status: true, data: courseprogress });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateCourseProgress(courseId, userId, lectureId, progress) {
        try {
            const updateStatus = await this.repository.UpdateCourseProgress(courseId, userId, lectureId, progress);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = CourseProgressService;
