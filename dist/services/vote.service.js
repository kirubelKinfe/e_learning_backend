"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class VoteService {
    constructor() {
        this.repository = new repositories_1.VoteRepository();
    }
    async GetVotes() {
        try {
            const votes = await this.repository.GetVotes();
            return (0, utils_1.FormateData)({ status: true, data: votes });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddVote(newVote) {
        try {
            const quiz = await this.repository.AddVote(newVote);
            return (0, utils_1.FormateData)({ status: true, data: quiz });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteVote(_id) {
        try {
            const data = await this.repository.DeleteVote(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = VoteService;
