"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class CourseService {
    constructor() {
        this.repository = new repositories_1.CourseRepository();
    }
    async GetCourses(query) {
        try {
            const courses = await this.repository.GetCourses(query);
            return (0, utils_1.FormateData)({ status: true, data: courses });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseById(courseId) {
        try {
            const course = await this.repository.GetCourseById(courseId);
            return (0, utils_1.FormateData)({ status: true, data: course });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseByDepartment(department) {
        try {
            const course = await this.repository.GetCourseByDepartment(department);
            return (0, utils_1.FormateData)({ status: true, data: course });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async CreateCourse(newCourse) {
        try {
            const course = await this.repository.CreateCourse(newCourse);
            return (0, utils_1.FormateData)({ status: true, data: course });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async PublishCourse(publishCourse) {
        try {
            const updateStatus = await this.repository.PublishCourse(publishCourse);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteCourse(_id) {
        try {
            const data = await this.repository.DeleteCourse(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = CourseService;
