"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class ReplyRepository {
    async GetReplies() {
        try {
            const replies = await models_1.Reply.find()
                .populate({
                path: 'votes',
            });
            return replies;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddReply(newReply) {
        const { author, textBody, discussionId, courseId } = newReply;
        try {
            const reply = await models_1.Reply.create({
                author, textBody, discussionId, courseId
            });
            const discussion = await models_1.Discussion.findOne({ _id: discussionId });
            if (!discussion) {
                throw new utils_1.ErrorResponse("Discussion not found", 400);
            }
            const replies = discussion.replies;
            await models_1.Discussion.updateOne({ _id: discussionId }, {
                $set: {
                    replies: [...replies, reply._id]
                }
            });
            return reply;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateReply(replyInfo) {
        const { _id, textBody } = replyInfo;
        try {
            const reply = await models_1.Reply.findOne({ _id });
            if (!reply) {
                throw new utils_1.ErrorResponse("Reply not found", 400);
            }
            await models_1.Reply.updateOne({ _id }, {
                $set: {
                    textBody
                }
            });
            return reply;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteReply(_id) {
        try {
            const reply = await models_1.Reply.findOne({ _id });
            if (!reply) {
                throw new utils_1.ErrorResponse("Reply not found", 400);
            }
            await models_1.Vote.deleteMany({ courseId: _id });
            const { discussionId } = reply;
            const discussion = await models_1.Discussion.findOne({ _id: discussionId });
            if (!discussion) {
                throw new utils_1.ErrorResponse("Discussion not found", 400);
            }
            discussion.replies = discussion.replies.filter((replyId) => replyId.toString() !== _id);
            await discussion.save();
            await models_1.Vote.deleteMany({ replyId: _id });
            const status = await models_1.Reply.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ReplyRepository;
