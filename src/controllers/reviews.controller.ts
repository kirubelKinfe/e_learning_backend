import { Request, Response, NextFunction } from "express"
import { ErrorResponse } from "../utils";
import { ReviewService } from "../services";
import { validateReview, validateUpdateReview } from "../validations";
import { ReviewInterface, ReviewUpdateInterface } from "../interfaces";
import mongoose from "mongoose";


interface CustomRequest extends Request {
    body: ReviewInterface;
    params: { courseId: string }
}

interface CustomUpdateRequest extends Request {
    body: ReviewUpdateInterface;
    params: {
        reviewId: string
    }
}

const service = new ReviewService()

export const getReviews = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetReviews();
        return res.json(data);  
    } catch (error) {
        next(error)
    }
}

export const getCourseReviews = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { courseId } = req.params
    try {
        const isId = mongoose.Types.ObjectId.isValid(courseId)
        if(isId) {
            const { data } = await service.GetCourseReviews(courseId);
            return res.json(data);
        } else {
            throw new ErrorResponse("Not a valid Id", 400)
        }  
    } catch (error) {
        next(error)
    }
}

export const addReview = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        await validateReview(req.body)
        const { data } = await service.AddReview(req.body);
        return res.json(data); 
    } catch (error) {
        next(error)
    }
}

export const updateReview = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    try {
        await validateUpdateReview(req.body)
        const { data } = await service.UpdateReview(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const deleteReview = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    const { reviewId } = req.params

    try { 
        if(!reviewId) {
            throw new ErrorResponse("reviewId is required", 400)
        }
        const { data } = await service.DeleteReview(reviewId);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}