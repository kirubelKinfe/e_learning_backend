"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class QuizService {
    constructor() {
        this.repository = new repositories_1.QuizRepository();
    }
    async GetQuizzes() {
        try {
            const quizzes = await this.repository.GetQuizzes();
            return (0, utils_1.FormateData)({ status: true, data: quizzes });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddQuiz(newQuiz) {
        try {
            const quiz = await this.repository.AddQuiz(newQuiz);
            return (0, utils_1.FormateData)({ status: true, data: quiz });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateQuiz(quizInfo) {
        try {
            const updateStatus = await this.repository.UpdateQuiz(quizInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteQuiz(_id) {
        try {
            const data = await this.repository.DeleteQuiz(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = QuizService;
