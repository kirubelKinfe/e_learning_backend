import { LectureService } from '../services';
import {ErrorResponse} from "../utils";
import { Request, Response, NextFunction } from "express";
import { validateLecture, validateUpdateLecture, validateUploadVideoLecture } from '../validations';
import { LectureInterface, LectureUpdateInterface, VideoLectureUploadInterface } from '../interfaces';
import mongoose from 'mongoose';

interface CustomRequest extends Request {
    body: LectureInterface;
}

interface CustomUpdateRequest extends Request {
  body: LectureUpdateInterface
  params: {
    lectureId: string
  }
}

interface CustomUploadVideoLectureRequest extends Request {
  body: VideoLectureUploadInterface
  params: {
    lectureId: string
  }
}

const service = new LectureService()

export const getLectures = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { data } = await service.GetLectures();
    return res.json(data);
  } catch (error) {
    next(error)
  }  
}

export const getLectureWithId = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { lectureId } = req.params

  try {
    const isId = mongoose.Types.ObjectId.isValid(lectureId)
    if(isId) {
      const { data } = await service.GetLectureWithId(lectureId);
      return res.json(data);
    } else {
      throw new ErrorResponse("Not a valid Id", 400)
    }
  } catch (error) {
    next(error)
  }  
}

export const addLecture = async (req: CustomRequest, res: Response, next: NextFunction) => {  
  try {      
    await validateLecture(req.body)
    const { data } = await service.AddLecture(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}

export const uploadVideoLecture = async (req: CustomUploadVideoLectureRequest, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    await validateUploadVideoLecture(req.body)
    const { data } = await service.UploadVideoLecture(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}
export const updateLecture = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
    await validateUpdateLecture(req.body)
    const { data } = await service.UpdateLecture(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}

export const deleteLecture = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  const { lectureId } = req.params

  try {
    if(!lectureId) {
      throw new ErrorResponse("_id is required", 400)
    }
    const { data } = await service.DeleteLecture(lectureId);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}