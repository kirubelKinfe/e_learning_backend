"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class ReplyService {
    constructor() {
        this.repository = new repositories_1.ReplyRepository();
    }
    async GetReplies() {
        try {
            const replies = await this.repository.GetReplies();
            return (0, utils_1.FormateData)({ status: true, data: replies });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddReply(newReply) {
        try {
            const reply = await this.repository.AddReply(newReply);
            return (0, utils_1.FormateData)({ status: true, data: reply });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateReply(replyInfo) {
        try {
            const updateStatus = await this.repository.UpdateReply(replyInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteReply(_id) {
        try {
            const data = await this.repository.DeleteReply(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ReplyService;
