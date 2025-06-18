import * as yup from 'yup';
import { QuestionInterface, QuestionUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateQuestion = async (
  question: QuestionInterface,
) => {
    const quizId = mongoose.Types.ObjectId.isValid(question.quizId.toString())
    const moduleId = mongoose.Types.ObjectId.isValid(question.moduleId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(question.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        answer: yup.string().required()
    });

    if(!quizId || !moduleId || !courseId) return

    return await schema.validate(question);
};

export const validateUpdateQuestion = async (
  question: QuestionUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(question._id.toString())
    const schema = yup.object().shape({
        title: yup.string().optional(),
        answer: yup.string().optional(),
        choices: yup.array().optional()
    });

    if(!_id) return

    return await schema.validate(question);
};