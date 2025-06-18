import { EnrollmentRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { EnrollmentInterface } from "../interfaces";

// All Business logic will be here
class EnrollmentService {
  repository: EnrollmentRepository
  
  constructor() {
    this.repository = new EnrollmentRepository()
  }

  async GetEnrollments(): Promise<any> {
    
    try {
      const enrollments = await this.repository.GetEnrollments();
      return FormateData({status: true, data: enrollments });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetEnrollment(userId: string, courseId: string): Promise<any> {
    
    try {
      const enrollment = await this.repository.GetEnrollment(userId, courseId);
      return FormateData({status: true, data: enrollment });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddEnrollment(newEnrollment: EnrollmentInterface): Promise<any> {
    
    try {
      const enrollment = await this.repository.AddEnrollment(newEnrollment);
      return FormateData({status: true, data: enrollment });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteEnrollment(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteEnrollment(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default EnrollmentService;