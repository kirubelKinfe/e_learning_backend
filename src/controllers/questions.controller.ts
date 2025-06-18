import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services";
import { QuestionInterface, QuestionUpdateInterface } from "../interfaces";
import { validateQuestion, validateUpdateQuestion } from "../validations";
import { ErrorResponse } from "../utils";

interface CustomRequest extends Request {
    body: QuestionInterface
}

interface CustomUpdateRequest extends Request {
    body: QuestionUpdateInterface
    params: {
      questionId: string
    }
}

const service = new QuestionService()

export const getQuestions = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetQuestions();
        return res.json(data);
    } catch (error) {
      next(error)
    }
  };
  
  export const addQuestion = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        validateQuestion(req.body)
        const { data } = await service.AddQuestion(req.body);
        return res.json(data);
    } catch (error) {
      next(error)
    }
  };
  
  export const updateQuestion = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    try {
        validateUpdateQuestion(req.body)
        const { data } = await service.UpdateQuestion(req.body);
        return res.json(data);
    } catch (error) {
      next(error)
    }
  };
  
  export const deleteQuestion = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    const { questionId } = req.params
  
    try {
        if(!questionId) {
            throw new ErrorResponse("questionId is required", 400)
        }
        const { data } = await service.DeleteQuestion(questionId);
        return res.json(data);
    } catch (error) {
      next(error)
    }
  }
  