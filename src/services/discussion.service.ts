import { DiscussionRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { DiscussionInterface, DiscussionUpdateInterface } from "../interfaces";
import { ObjectId } from "mongoose";


// All Business logic will be here
class DiscussionService {
  repository: DiscussionRepository
  
  constructor() {
    this.repository = new DiscussionRepository()
  }

  async GetDiscussions(): Promise<any> {
    
    try {
      const discussions = await this.repository.GetDiscussions();
      return FormateData({status: true, data: discussions });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddDiscussion(newDiscussion: DiscussionInterface): Promise<any> {
    
    try {
      const quiz = await this.repository.AddDiscussion(newDiscussion);
      return FormateData({status: true, data: quiz });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateDiscussion(discussionInfo: DiscussionUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateDiscussion(discussionInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteDiscussion(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteDiscussion(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default DiscussionService;