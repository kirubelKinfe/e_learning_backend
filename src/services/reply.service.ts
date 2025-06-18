import { ReplyRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { ReplyInterface, ReplyUpdateInterface } from "../interfaces";


// All Business logic will be here
class ReplyService {
  repository: ReplyRepository
  
  constructor() {
    this.repository = new ReplyRepository()
  }

  async GetReplies(): Promise<any> {
    
    try {
      const replies = await this.repository.GetReplies();
      return FormateData({status: true, data: replies });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddReply(newReply: ReplyInterface): Promise<any> {
    
    try {
      const reply = await this.repository.AddReply(newReply);
      return FormateData({status: true, data: reply });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateReply(replyInfo: ReplyUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateReply(replyInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteReply(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteReply(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default ReplyService;