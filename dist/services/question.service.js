"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class QuestionService {
    constructor() {
        this.repository = new repositories_1.QuestionRepository();
    }
    async GetQuestions() {
        try {
            const questions = await this.repository.GetQuestions();
            return (0, utils_1.FormateData)({ status: true, data: questions });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddQuestion(newQuestion) {
        try {
            const question = await this.repository.AddQuestion(newQuestion);
            return (0, utils_1.FormateData)({ status: true, data: question });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateQuestion(questionInfo) {
        try {
            const updateStatus = await this.repository.UpdateQuestion(questionInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteQuestion(_id) {
        try {
            const data = await this.repository.DeleteQuestion(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = QuestionService;
