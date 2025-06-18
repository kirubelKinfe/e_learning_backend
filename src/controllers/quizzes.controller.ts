import { Request, Response, NextFunction } from "express";
import { QuizInterface, QuizUpdateInterface } from "../interfaces";
import { QuizService } from "../services";
import { validateQuiz, validateUpdateQuiz } from "../validations";
import { ErrorResponse } from "../utils";

interface CustomRequest extends Request {
  body: QuizInterface;
}

interface CustomUpdateRequest extends Request {
  body: QuizUpdateInterface;
  params: {
    quizId: string
  }
}

const service = new QuizService()

export const getQuizzes = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const { data } = await service.GetQuizzes();
    return res.json(data);
  } catch (error) {
    next(error)
  }
};

export const addQuiz = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    validateQuiz(req.body)
    const { data } = await service.AddQuiz(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
};

export const updateQuiz = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  try {
    validateUpdateQuiz(req.body)
    const { data } = await service.UpdateQuiz(req.body);
    return res.json(data);
  } catch (error) {
    next(error)
  }
};

export const deleteQuiz = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  const { quizId } = req.params;

  try {
    if(!quizId) {
      throw new ErrorResponse("quizId is required", 400)
    }
    const { data } = await service.DeleteQuiz(quizId);
  return res.json(data);
  } catch (error) {
    next(error)
  }
};