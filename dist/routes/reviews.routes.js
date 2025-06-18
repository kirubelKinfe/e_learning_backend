"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("../controllers/reviews.controller");
const router = express_1.default.Router();
router.route('/')
    .get(reviews_controller_1.getReviews)
    .post(reviews_controller_1.addReview)
    .put(reviews_controller_1.updateReview);
router.route('/:reviewId')
    .delete(reviews_controller_1.deleteReview);
router.route('/:courseId').get(reviews_controller_1.getCourseReviews);
module.exports = router;
