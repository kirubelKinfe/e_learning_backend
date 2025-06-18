import { ReviewRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { ReviewInterface, ReviewUpdateInterface } from "../interfaces";


// All Business logic will be here
class ReviewService {
  repository: ReviewRepository
  
  constructor() {
    this.repository = new ReviewRepository()
  }

  async GetReviews(): Promise<any> {    
    try {
      const reviews = await this.repository.GetReviews();
      return FormateData({status: true, data: reviews });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async GetCourseReviews(courseId: string): Promise<any> {    
    try {
      const reviews = await this.repository.GetCourseReviews(courseId);
      return FormateData({status: true, data: reviews });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddReview(newReview: ReviewInterface): Promise<any> {
    
    try {
      const review = await this.repository.AddReview(newReview);
      return FormateData({status: true, data: review });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateReview(reviewInfo: ReviewUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateReview(reviewInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteReview(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteReview(_id);
      return FormateData(data);
    } catch (error: any) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default ReviewService;