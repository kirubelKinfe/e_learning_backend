"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class ReviewService {
    constructor() {
        this.repository = new repositories_1.ReviewRepository();
    }
    async GetReviews() {
        try {
            const reviews = await this.repository.GetReviews();
            return (0, utils_1.FormateData)({ status: true, data: reviews });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseReviews(courseId) {
        try {
            const reviews = await this.repository.GetCourseReviews(courseId);
            return (0, utils_1.FormateData)({ status: true, data: reviews });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddReview(newReview) {
        try {
            const review = await this.repository.AddReview(newReview);
            return (0, utils_1.FormateData)({ status: true, data: review });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateReview(reviewInfo) {
        try {
            const updateStatus = await this.repository.UpdateReview(reviewInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteReview(_id) {
        try {
            const data = await this.repository.DeleteReview(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ReviewService;
