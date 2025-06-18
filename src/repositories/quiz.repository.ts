import { Module, Question, Quiz } from '../models';
import { QuizInterface, QuizUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class QuizRepository {

    async GetQuizzes(): Promise<any>  {
        try{
            const quizzes = await Quiz.find()
                      .populate({
                        path: 'questions',
                        populate: { path: 'answers' }
                      });
            return quizzes
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddQuiz(newQuiz: QuizInterface): Promise<any>  {
        const { title, description, moduleId, courseId } = newQuiz
        try{
            const quiz = await Quiz.create({
                title, description, moduleId, courseId
            })

            const module = await Module.findOne({ _id: moduleId })
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            
            const quizzes = module.quizzes
            await Module.updateOne({ _id: moduleId },
                {
                    $set: {
                        quizzes:[...quizzes, quiz._id ]
                    }
                });
            return quiz
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateQuiz(quizInfo: QuizUpdateInterface): Promise<any>  {
        const { _id, title, description} = quizInfo
        try{
            const quiz = await Quiz.findOne({_id})
            if(!quiz) {
                throw new ErrorResponse("Quiz not found", 400)
            }
            await Quiz.updateOne({ _id },
                        {
                            $set: {
                                title,
                                description
                            }
                        });
            return quiz
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteQuiz(_id: string): Promise<any>  {
        try{
            const quiz = await Quiz.findOne({_id})
            if(!quiz) {
                throw new ErrorResponse("Quiz not found", 400)
            }

            await Question.deleteMany({ quizId: _id })

            const { moduleId } = quiz
            
            const module = await Module.findOne({ _id: moduleId })
            if(!module) {
                throw new ErrorResponse("Module not found", 400)
            }
            module.quizzes = module.quizzes.filter((quizId) => quizId.toString() !== _id)
            await module.save()
            
            const status = await Quiz.deleteOne({_id})
            return status
        } catch(error: any){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default QuizRepository;