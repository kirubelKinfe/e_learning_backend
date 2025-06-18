"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class QuestionRepository {
    async GetQuestions() {
        try {
            const questions = await models_1.Question.find();
            return questions;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddQuestion(newQuestion) {
        const { title, answer, quizId, moduleId, courseId } = newQuestion;
        try {
            const quest = await models_1.Question.create({
                title, answer, quizId, moduleId, courseId
            });
            const quiz = await models_1.Quiz.findOne({ _id: quizId });
            if (!quiz) {
                throw new utils_1.ErrorResponse("Quiz not found", 400);
            }
            const questions = quiz.questions;
            await models_1.Quiz.updateOne({ _id: quizId }, {
                $set: {
                    questions: [...questions, quest._id]
                }
            });
            return quest;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateQuestion(questionInfo) {
        const { _id, title, answer, choices } = questionInfo;
        try {
            const quest = await models_1.Question.findOne({ _id });
            if (!quest) {
                throw new utils_1.ErrorResponse("Question not found", 400);
            }
            await models_1.Question.updateOne({ _id }, {
                $set: {
                    title,
                    answer,
                    choices
                }
            });
            return quest;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteQuestion(_id) {
        try {
            const question = await models_1.Question.findOne({ _id });
            if (!question) {
                throw new utils_1.ErrorResponse("Question not found", 400);
            }
            const { quizId } = question;
            const quiz = await models_1.Quiz.findOne({ _id: quizId });
            if (!quiz) {
                throw new utils_1.ErrorResponse("Quiz not found", 400);
            }
            quiz.questions = quiz.questions.filter((questionId) => questionId.toString() !== _id);
            await quiz.save();
            const status = await models_1.Question.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = QuestionRepository;
