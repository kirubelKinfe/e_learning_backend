import { QuizRepository } from "../repositories";
import { ErrorResponse, FormateData } from "../utils";
import { QuizInterface, QuizUpdateInterface } from "../interfaces";


// All Business logic will be here
class QuizService {
  repository: QuizRepository
  
  constructor() {
    this.repository = new QuizRepository()
  }

  async GetQuizzes(): Promise<any> {
    
    try {
      const quizzes = await this.repository.GetQuizzes();
      return FormateData({status: true, data: quizzes });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async AddQuiz(newQuiz: QuizInterface): Promise<any> {
    
    try {
      const quiz = await this.repository.AddQuiz(newQuiz);
      return FormateData({status: true, data: quiz });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async UpdateQuiz(quizInfo: QuizUpdateInterface): Promise<any> {
    
    try {
      const updateStatus = await this.repository.UpdateQuiz(quizInfo);
      return FormateData({status: true, data: updateStatus });
    } catch (error) {
        throw new ErrorResponse(error.message, 400)
    }
  }

  async DeleteQuiz(_id: string): Promise<any> {
    
    try {
      const data = await this.repository.DeleteQuiz(_id);
      return FormateData(data);
    } catch (error) {
      throw new ErrorResponse(error.message, 400)
    }
  }
}


export default QuizService;