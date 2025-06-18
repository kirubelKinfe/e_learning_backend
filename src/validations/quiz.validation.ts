import * as yup from 'yup';
import { QuizInterface, QuizUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateQuiz = async (
  quiz: QuizInterface,
) => {
    const moduleId = mongoose.Types.ObjectId.isValid(quiz.moduleId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(quiz.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional()
    });

    if(!moduleId || !courseId) return

    return await schema.validate(quiz);
};

export const validateUpdateQuiz = async (
  quiz: QuizUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(quiz._id.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional(),
    });

    if(!_id) return

    return await schema.validate(quiz);
};