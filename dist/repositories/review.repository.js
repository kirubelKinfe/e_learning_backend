"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class ReviewRepository {
    async GetReviews() {
        try {
            const reviews = await models_1.Review.find()
                .populate('userId')
                .populate('courseId');
            return reviews;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseReviews(courseId) {
        try {
            const reviews = await models_1.Review.find({ courseId })
                .populate('userId')
                .populate('courseId');
            return reviews;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddReview(newReview) {
        const { comment, rating, userId, courseId } = newReview;
        try {
            const review = await models_1.Review.create({
                comment, rating, userId, courseId
            });
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            const reviews = course.reviews;
            const courseReviews = await models_1.Review.find({ courseId });
            if (!courseReviews) {
                throw new utils_1.ErrorResponse("Reviews not found", 400);
            }
            let totalRating = 0;
            let count = 0;
            courseReviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString());
                count++;
                return totalRating;
            });
            const newRating = Math.round((totalRating / count) * 100) / 100;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    reviews: [...reviews, review._id],
                    rating: newRating
                }
            });
            return review;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateReview(reviewInfo) {
        const { _id, comment, rating } = reviewInfo;
        console.log(reviewInfo);
        try {
            const review = await models_1.Review.findOne({ _id });
            if (!review) {
                throw new utils_1.ErrorResponse("Review not found", 400);
            }
            await models_1.Review.updateOne({ _id }, {
                $set: {
                    rating,
                    comment
                }
            });
            const { courseId } = review;
            const courseReviews = await models_1.Review.find({ courseId });
            if (!courseReviews) {
                throw new utils_1.ErrorResponse("Reviews not found", 400);
            }
            let totalRating = 0;
            let count = 0;
            courseReviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString());
                count++;
                return totalRating;
            });
            const updatedRating = Math.round((totalRating / count) * 100) / 100;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    rating: updatedRating
                }
            });
            return review;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteReview(_id) {
        try {
            const review = await models_1.Review.findOne({ _id });
            if (!review) {
                throw new utils_1.ErrorResponse("Review not found", 400);
            }
            const { rating, courseId } = review;
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            course.reviews = course.reviews.filter((reviewId) => reviewId.toString() !== _id);
            await course.save();
            const status = await models_1.Review.deleteOne({ _id });
            const reviews = await models_1.Review.find();
            if (!reviews) {
                throw new utils_1.ErrorResponse("Reviews not found", 400);
            }
            let totalRating = 0;
            let count = 0;
            reviews?.map((review) => {
                totalRating += Number.parseFloat(review.rating.toString());
                count++;
                return totalRating;
            });
            const newRating = Math.round((totalRating / count) * 100) / 100;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    rating: newRating
                }
            });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ReviewRepository;
