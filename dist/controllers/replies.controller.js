"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.updateReply = exports.addReply = exports.getReplies = void 0;
const validations_1 = require("../validations");
const services_1 = require("../services");
const utils_1 = require("../utils");
const service = new services_1.ReplyService();
const getReplies = async (req, res, next) => {
    try {
        const { data } = await service.GetReplies();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getReplies = getReplies;
const addReply = async (req, res, next) => {
    try {
        (0, validations_1.validateReply)(req.body);
        const { data } = await service.AddReply(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addReply = addReply;
const updateReply = async (req, res, next) => {
    try {
        (0, validations_1.validateUpdateReply)(req.body);
        const { data } = await service.UpdateReply(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateReply = updateReply;
const deleteReply = async (req, res, next) => {
    const { replyId } = req.params;
    try {
        if (!replyId) {
            throw new utils_1.ErrorResponse("replyId is required", 400);
        }
        const { data } = await service.DeleteReply(replyId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteReply = deleteReply;
