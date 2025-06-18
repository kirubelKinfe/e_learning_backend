import { CourseProgressRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";

// All Business logic will be here
class CourseProgressService {
  repository: CourseProgressRepository
  
  constructor() {
    this.repository = new CourseProgressRepository()
  }

  async GetCourseProgress(courseId: string, userId: string): Promise<any> {
    
    try {
      const courseprogress = await this.repository.GetCourseProgress(courseId, userId);
      return FormateData({status: true, data: courseprogress });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateCourseProgress(courseId: string, userId: string, lectureId: any, progress: number): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateCourseProgress(courseId, userId, lectureId, progress);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }
}

export default CourseProgressService;