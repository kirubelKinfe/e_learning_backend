"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.addReview = exports.getCourseReviews = exports.getReviews = void 0;
const utils_1 = require("../utils");
const services_1 = require("../services");
const validations_1 = require("../validations");
const mongoose_1 = __importDefault(require("mongoose"));
const service = new services_1.ReviewService();
const getReviews = async (req, res, next) => {
    try {
        const { data } = await service.GetReviews();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getReviews = getReviews;
const getCourseReviews = async (req, res, next) => {
    const { courseId } = req.params;
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(courseId);
        if (isId) {
            const { data } = await service.GetCourseReviews(courseId);
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
exports.getCourseReviews = getCourseReviews;
const addReview = async (req, res, next) => {
    try {
        await (0, validations_1.validateReview)(req.body);
        const { data } = await service.AddReview(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addReview = addReview;
const updateReview = async (req, res, next) => {
    try {
        await (0, validations_1.validateUpdateReview)(req.body);
        const { data } = await service.UpdateReview(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res, next) => {
    const { reviewId } = req.params;
    try {
        if (!reviewId) {
            throw new utils_1.ErrorResponse("reviewId is required", 400);
        }
        const { data } = await service.DeleteReview(reviewId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReview = deleteReview;
