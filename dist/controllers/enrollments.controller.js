"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEnrollment = exports.addEnrollment = exports.getEnrollment = exports.getEnrollments = void 0;
const validations_1 = require("../validations");
const services_1 = require("../services");
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
const service = new services_1.EnrollmentService();
const getEnrollments = async (req, res, next) => {
    try {
        const { data } = await service.GetEnrollments();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getEnrollments = getEnrollments;
const getEnrollment = async (req, res, next) => {
    const { userId, courseId } = req.params;
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(courseId) && mongoose_1.default.Types.ObjectId.isValid(userId);
        if (isId) {
            const { data } = await service.GetEnrollment(userId, courseId);
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
exports.getEnrollment = getEnrollment;
const addEnrollment = async (req, res, next) => {
    try {
        (0, validations_1.validateEnrollment)(req.body);
        const { data } = await service.AddEnrollment(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addEnrollment = addEnrollment;
const deleteEnrollment = async (req, res, next) => {
    const { enrollmentId } = req.params;
    try {
        if (!enrollmentId) {
            throw new utils_1.ErrorResponse("enrollmentId is required", 400);
        }
        const { data } = await service.DeleteEnrollment(enrollmentId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEnrollment = deleteEnrollment;
