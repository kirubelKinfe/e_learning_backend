"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDiscussion = exports.updateDiscussion = exports.addDiscussion = exports.getDiscussions = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const service = new services_1.DiscussionService();
const getDiscussions = async (req, res, next) => {
    try {
        const { data } = await service.GetDiscussions();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getDiscussions = getDiscussions;
const addDiscussion = async (req, res, next) => {
    try {
        (0, validations_1.validateDiscussion)(req.body);
        const { data } = await service.AddDiscussion(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addDiscussion = addDiscussion;
const updateDiscussion = async (req, res, next) => {
    try {
        (0, validations_1.validateUpdateDiscussion)(req.body);
        const { data } = await service.UpdateDiscussion(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateDiscussion = updateDiscussion;
const deleteDiscussion = async (req, res, next) => {
    const { discussionId } = req.params;
    try {
        if (!discussionId) {
            throw new utils_1.ErrorResponse("discussionId is required", 400);
        }
        const { data } = await service.DeleteDiscussion(discussionId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteDiscussion = deleteDiscussion;
