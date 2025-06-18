import { PublishCourseInterface, CreateCourseInterface, RequestQueryInterface } from '../interfaces';
import {ErrorResponse} from "../utils";
import { Request, Response, NextFunction } from "express";
import mongoose, { ObjectId } from 'mongoose';
import { CourseService } from '../services';
import { validateCreateCourse, validatePublishCourse } from '../validations';

interface CustomRequest extends Request {
    body: CreateCourseInterface,
    params: { 
      courseId: string,
      department: string 
    }
}

interface CustomResponse extends Response {
  results : {
    total: number,
    pagination: {
      next?: {
        page: number,
        limit: number,
      }
      prev?: {
        page: number,
        limit: number,
      }
    },
    results: number,
    status: string,
    message: string,
    data: any,
  };
}

interface CustomPublishRequest extends Request {
  body: PublishCourseInterface
  params: {
    courseId: string,
  }
}

  
const service = new CourseService()

export const getCourses = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  try {
    const { page, limit, category, name, instructor } = req.query
    const query = { page, limit, category, name, instructor } as RequestQueryInterface
    console.log(query)
    const { data } = await service.GetCourses(query);
    return res.json(data);
  } catch (error) {
    next(error)
  }  
}

export const getCourseById = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { courseId } = req.params
  
  try {
    const isId = mongoose.Types.ObjectId.isValid(courseId)
    if(isId) {
      const { data } = await service.GetCourseById(courseId);
      return res.json(data);
    } else {
      throw new ErrorResponse("Not a valid Id", 400)
    }
    
  } catch (error) {
    next(error)
  }  
}

export const getCourseByDepartment = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { department } = req.params
  
  try {
    if(department) {
      const { data } = await service.GetCourseByDepartment(department);
      return res.json(data);
    } else {
      throw new ErrorResponse("Not a valid Id", 400)
    }
  } catch (error) {
    next(error)
  }  
}


export const createCourse =  async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    await validateCreateCourse(req.body)
    const { data } = await service.CreateCourse(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}

export const publishCourse = async (req: CustomPublishRequest, res: Response, next: NextFunction) => {
  try {
    await validatePublishCourse(req.body)
    const { data } = await service.PublishCourse(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}

export const deleteCourse = async (req: CustomPublishRequest, res: Response, next: NextFunction) => {
  const { courseId } = req.params
  try {
    if(!courseId) {
      throw new ErrorResponse("courseId is required", 400)
    }
    const { data } = await service.DeleteCourse(courseId);
    return res.json(data);
  } catch (error) {
    next(error)
  }
}