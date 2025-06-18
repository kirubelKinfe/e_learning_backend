"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class DiscussionService {
    constructor() {
        this.repository = new repositories_1.DiscussionRepository();
    }
    async GetDiscussions() {
        try {
            const discussions = await this.repository.GetDiscussions();
            return (0, utils_1.FormateData)({ status: true, data: discussions });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddDiscussion(newDiscussion) {
        try {
            const quiz = await this.repository.AddDiscussion(newDiscussion);
            return (0, utils_1.FormateData)({ status: true, data: quiz });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateDiscussion(discussionInfo) {
        try {
            const updateStatus = await this.repository.UpdateDiscussion(discussionInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteDiscussion(_id) {
        try {
            const data = await this.repository.DeleteDiscussion(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = DiscussionService;
