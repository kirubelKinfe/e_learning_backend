import { Question, Quiz } from '../models';
import { QuestionInterface, QuestionUpdateInterface } from '../interfaces';
import { ErrorResponse } from '../utils';


//Dealing with data base operations
class QuestionRepository {

    async GetQuestions(): Promise<any>  {
        try{
            const questions = await Question.find()
            return questions
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async AddQuestion(newQuestion: QuestionInterface): Promise<any>  {
        const { title, answer, quizId, moduleId, courseId } = newQuestion
        try{
            const quest = await Question.create({
                title, answer, quizId, moduleId, courseId
            })

            const quiz = await Quiz.findOne({ _id: quizId })
            if(!quiz) {
                throw new ErrorResponse("Quiz not found", 400)
            }
            
            const questions = quiz.questions
            await Quiz.updateOne({ _id: quizId },
                {
                    $set: {
                        questions:[...questions, quest._id ]
                    }
                });
            return quest
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async UpdateQuestion(questionInfo: QuestionUpdateInterface): Promise<any>  {
        const { _id, title, answer, choices} = questionInfo
        try{
            const quest = await Question.findOne({_id})
            if(!quest) {
                throw new ErrorResponse("Question not found", 400)
            }
            
            await Question.updateOne({ _id },
                        {
                            $set: {
                                title,
                                answer,
                                choices
                            }
                        });
            return quest
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async DeleteQuestion(_id: string): Promise<any>  {
        try{
            const question = await Question.findOne({_id})
            if(!question) {
                throw new ErrorResponse("Question not found", 400)
            }

            const { quizId } = question
            
            const quiz = await Quiz.findOne({ _id: quizId })
            if(!quiz) {
                throw new ErrorResponse("Quiz not found", 400)
            }
            quiz.questions = quiz.questions.filter((questionId) => questionId.toString() !== _id)
            await quiz.save()

            const status = await Question.deleteOne({_id})
            return status
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
}

export default QuestionRepository;