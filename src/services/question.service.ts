import { QuestionRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { QuestionInterface, QuestionUpdateInterface } from "../interfaces";


// All Business logic will be here
class QuestionService {
  repository: QuestionRepository
  
  constructor() {
    this.repository = new QuestionRepository()
  }

  async GetQuestions(): Promise<any> {
    
    try {
      const questions = await this.repository.GetQuestions();
      return FormateData({status: true, data: questions });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddQuestion(newQuestion: QuestionInterface): Promise<any> {
    
    try {
      const question = await this.repository.AddQuestion(newQuestion);
      return FormateData({status: true, data: question });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateQuestion(questionInfo: QuestionUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateQuestion(questionInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error: any) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteQuestion(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteQuestion(_id);
      return FormateData(data);
    } catch (error: any) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default QuestionService;