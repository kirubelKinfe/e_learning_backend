import { VoteRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { VoteInterface } from "../interfaces";


// All Business logic will be here
class VoteService {
  repository: VoteRepository
  
  constructor() {
    this.repository = new VoteRepository()
  }

  async GetVotes(): Promise<any> {
    
    try {
      const votes = await this.repository.GetVotes();
      return FormateData({status: true, data: votes });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddVote(newVote: VoteInterface): Promise<any> {
    
    try {
      const quiz = await this.repository.AddVote(newVote);
      return FormateData({status: true, data: quiz });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteVote(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteVote(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default VoteService;