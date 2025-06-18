"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.addQuestion = exports.getQuestions = void 0;
const services_1 = require("../services");
const validations_1 = require("../validations");
const utils_1 = require("../utils");
const service = new services_1.QuestionService();
const getQuestions = async (req, res, next) => {
    try {
        const { data } = await service.GetQuestions();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getQuestions = getQuestions;
const addQuestion = async (req, res, next) => {
    try {
        (0, validations_1.validateQuestion)(req.body);
        const { data } = await service.AddQuestion(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addQuestion = addQuestion;
const updateQuestion = async (req, res, next) => {
    try {
        (0, validations_1.validateUpdateQuestion)(req.body);
        const { data } = await service.UpdateQuestion(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateQuestion = updateQuestion;
const deleteQuestion = async (req, res, next) => {
    const { questionId } = req.params;
    try {
        if (!questionId) {
            throw new utils_1.ErrorResponse("questionId is required", 400);
        }
        const { data } = await service.DeleteQuestion(questionId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteQuestion = deleteQuestion;
