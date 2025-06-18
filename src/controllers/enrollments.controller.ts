import { EnrollmentInterface } from '../interfaces';
import { validateEnrollment } from '../validations';
import { Request, Response, NextFunction } from "express";
import { EnrollmentService } from '../services';
import { ErrorResponse } from '../utils';
import mongoose from 'mongoose';

interface CustomRequest extends Request {
    body: EnrollmentInterface;
    params: { 
        userId: string,
        courseId: string
    }
}

interface CustomDeleteRequest extends Request {
    params: {
        enrollmentId: string
    }
}

const service = new EnrollmentService()

export const getEnrollments = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetEnrollments();
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const getEnrollment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId, courseId } = req.params
    try {
        const isId = mongoose.Types.ObjectId.isValid(courseId) && mongoose.Types.ObjectId.isValid(userId)
        if(isId) {
            const { data } = await service.GetEnrollment(userId, courseId);
            return res.json(data);
        } else {
            throw new ErrorResponse("Not a valid Id", 400)
        }
    } catch (error) {
        next(error)
    }
}

export const addEnrollment = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        validateEnrollment(req.body)
        const { data } = await service.AddEnrollment(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const deleteEnrollment = async (req: CustomDeleteRequest, res: Response, next: NextFunction) => {
    const { enrollmentId } = req.params;
  
    try {
      if(!enrollmentId) {
        throw new ErrorResponse("enrollmentId is required", 400)
      }
      const { data } = await service.DeleteEnrollment(enrollmentId);
    return res.json(data);
    } catch (error) {
      next(error)
    }
  };