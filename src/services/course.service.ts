import { CourseRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { CreateCourseInterface, PublishCourseInterface, RequestQueryInterface } from "../interfaces";

// All Business logic will be here
class CourseService {
  repository: CourseRepository
  
  constructor() {
    this.repository = new CourseRepository()
  }

  async GetCourses(query: RequestQueryInterface): Promise<any> {
    
    try {
      const courses = await this.repository.GetCourses(query);
      return FormateData({status: true, data: courses });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetCourseById(courseId: string): Promise<any> {
    
    try {
      const course = await this.repository.GetCourseById(courseId);
      return FormateData({status: true, data: course });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetCourseByDepartment(department: string): Promise<any> {
    
    try {
      const course = await this.repository.GetCourseByDepartment(department);
      return FormateData({status: true, data: course });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async CreateCourse(newCourse: CreateCourseInterface): Promise<any> {
    
    try {
      const course = await this.repository.CreateCourse(newCourse);
      return FormateData({status: true, data: course });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async PublishCourse(publishCourse: PublishCourseInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.PublishCourse(publishCourse);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteCourse(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteCourse(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default CourseService;