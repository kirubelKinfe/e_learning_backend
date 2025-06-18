import * as yup from 'yup';
import { ReviewInterface, ReviewUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateReview = async (
  review: ReviewInterface,
) => {
    const userId = mongoose.Types.ObjectId.isValid(review.userId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(review.courseId.toString())
    const schema = yup.object().shape({
        rating: yup.number().required(),
        comment: yup.string().required()
    });

    if(!userId || !courseId) return

    return await schema.validate(review);
};

export const validateUpdateReview = async (
  review: ReviewUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(review._id.toString())
    const schema = yup.object().shape({
        rating: yup.number().optional(),
        comment: yup.string().optional()
    });

    if(!_id) return

    return await schema.validate(review);
};