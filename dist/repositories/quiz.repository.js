"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class QuizRepository {
    async GetQuizzes() {
        try {
            const quizzes = await models_1.Quiz.find()
                .populate({
                path: 'questions',
                populate: { path: 'answers' }
            });
            return quizzes;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddQuiz(newQuiz) {
        const { title, description, moduleId, courseId } = newQuiz;
        try {
            const quiz = await models_1.Quiz.create({
                title, description, moduleId, courseId
            });
            const module = await models_1.Module.findOne({ _id: moduleId });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            const quizzes = module.quizzes;
            await models_1.Module.updateOne({ _id: moduleId }, {
                $set: {
                    quizzes: [...quizzes, quiz._id]
                }
            });
            return quiz;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateQuiz(quizInfo) {
        const { _id, title, description } = quizInfo;
        try {
            const quiz = await models_1.Quiz.findOne({ _id });
            if (!quiz) {
                throw new utils_1.ErrorResponse("Quiz not found", 400);
            }
            await models_1.Quiz.updateOne({ _id }, {
                $set: {
                    title,
                    description
                }
            });
            return quiz;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteQuiz(_id) {
        try {
            const quiz = await models_1.Quiz.findOne({ _id });
            if (!quiz) {
                throw new utils_1.ErrorResponse("Quiz not found", 400);
            }
            await models_1.Question.deleteMany({ quizId: _id });
            const { moduleId } = quiz;
            const module = await models_1.Module.findOne({ _id: moduleId });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            module.quizzes = module.quizzes.filter((quizId) => quizId.toString() !== _id);
            await module.save();
            const status = await models_1.Quiz.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = QuizRepository;
