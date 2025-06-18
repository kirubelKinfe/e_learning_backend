"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.publishCourse = exports.createCourse = exports.getCourseByDepartment = exports.getCourseById = exports.getCourses = void 0;
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("../services");
const validations_1 = require("../validations");
const service = new services_1.CourseService();
const getCourses = async (req, res, next) => {
    try {
        const { page, limit, category, name, instructor } = req.query;
        const query = { page, limit, category, name, instructor };
        console.log(query);
        const { data } = await service.GetCourses(query);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getCourses = getCourses;
const getCourseById = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(courseId);
        if (isId) {
            const { data } = await service.GetCourseById(courseId);
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
exports.getCourseById = getCourseById;
const getCourseByDepartment = async (req, res, next) => {
    const { department } = req.params;
    try {
        if (department) {
            const { data } = await service.GetCourseByDepartment(department);
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
exports.getCourseByDepartment = getCourseByDepartment;
const createCourse = async (req, res, next) => {
    try {
        await (0, validations_1.validateCreateCourse)(req.body);
        const { data } = await service.CreateCourse(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.createCourse = createCourse;
const publishCourse = async (req, res, next) => {
    try {
        await (0, validations_1.validatePublishCourse)(req.body);
        const { data } = await service.PublishCourse(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.publishCourse = publishCourse;
const deleteCourse = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        if (!courseId) {
            throw new utils_1.ErrorResponse("courseId is required", 400);
        }
        const { data } = await service.DeleteCourse(courseId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCourse = deleteCourse;
