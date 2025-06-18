import * as yup from 'yup';
import { CourseProgressInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateCourseProgress = async (
    courseProgress: CourseProgressInterface,
  ) => {
      const userId = mongoose.Types.ObjectId.isValid(courseProgress.userId.toString())
      const courseId = mongoose.Types.ObjectId.isValid(courseProgress.courseId.toString())
      const schema = yup.object().shape({
          lectureProgress: yup.array()
      });
  
      if(!userId || courseId) return
  
      return await schema.validate(courseProgress);
};
