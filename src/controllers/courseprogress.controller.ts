import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils";
import mongoose from "mongoose";
import { CourseProgressService } from "../services";
interface CustomRequest extends Request {
  body: {
    lectureId: any,
    progress: number
  };
  params: {
    courseId: string,
    userId: string
  };
}

const service = new CourseProgressService()
// Get course progress
export const getCourseProgress = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { userId, courseId } = req.params;

  try {
    const isCourseId = mongoose.Types.ObjectId.isValid(courseId)
    const isUserId = mongoose.Types.ObjectId.isValid(userId)
    if(isCourseId || isUserId) {
      const { data } = await service.GetCourseProgress(courseId, userId);
      return res.json(data);
    } else {
      throw new ErrorResponse("Not a valid Id", 400)
    }
  } catch (error) {
    next(error)
  }
};

// Update lecture progress
export const updateCourseProgress = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { userId, courseId } = req.params;
  const { lectureId, progress } = req.body;

  try {
    const { data } = await service.UpdateCourseProgress(courseId, userId, lectureId, progress);
    return res.json(data);
  } catch (error) {
    next(error)
  }
};