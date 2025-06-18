"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.addQuiz = exports.getQuizzes = void 0;
const services_1 = require("../services");
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const service = new services_1.QuizService();
const getQuizzes = async (req, res, next) => {
    try {
        const { data } = await service.GetQuizzes();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getQuizzes = getQuizzes;
const addQuiz = async (req, res, next) => {
    try {
        (0, validations_1.validateQuiz)(req.body);
        const { data } = await service.AddQuiz(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addQuiz = addQuiz;
const updateQuiz = async (req, res, next) => {
    try {
        (0, validations_1.validateUpdateQuiz)(req.body);
        const { data } = await service.UpdateQuiz(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateQuiz = updateQuiz;
const deleteQuiz = async (req, res, next) => {
    const { quizId } = req.params;
    try {
        if (!quizId) {
            throw new utils_1.ErrorResponse("quizId is required", 400);
        }
        const { data } = await service.DeleteQuiz(quizId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteQuiz = deleteQuiz;
