"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class EnrollmentService {
    constructor() {
        this.repository = new repositories_1.EnrollmentRepository();
    }
    async GetEnrollments() {
        try {
            const enrollments = await this.repository.GetEnrollments();
            return (0, utils_1.FormateData)({ status: true, data: enrollments });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetEnrollment(userId, courseId) {
        try {
            const enrollment = await this.repository.GetEnrollment(userId, courseId);
            return (0, utils_1.FormateData)({ status: true, data: enrollment });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddEnrollment(newEnrollment) {
        try {
            const enrollment = await this.repository.AddEnrollment(newEnrollment);
            return (0, utils_1.FormateData)({ status: true, data: enrollment });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteEnrollment(_id) {
        try {
            const data = await this.repository.DeleteEnrollment(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = EnrollmentService;
