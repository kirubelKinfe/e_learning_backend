"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class VoteRepository {
    async GetVotes() {
        try {
            const votes = await models_1.Vote.find();
            return votes;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddVote(newVote) {
        const { vote, userId, replyId, discussionId, courseId } = newVote;
        try {
            const vot = await models_1.Vote.create({
                vote, userId, replyId, discussionId, courseId
            });
            const reply = await models_1.Reply.findOne({ _id: replyId });
            if (!reply) {
                throw new utils_1.ErrorResponse("Reply not found", 400);
            }
            const votes = reply.votes;
            await models_1.Reply.updateOne({ _id: replyId }, {
                $set: {
                    votes: [...votes, vot._id]
                }
            });
            return vot;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteVote(_id) {
        try {
            const vote = await models_1.Vote.findOne({ _id });
            if (!vote) {
                throw new utils_1.ErrorResponse("Vote not found", 400);
            }
            const { replyId } = vote;
            const reply = await models_1.Reply.findOne({ _id: replyId });
            if (!reply) {
                throw new utils_1.ErrorResponse("Reply not found", 400);
            }
            reply.votes = reply.votes.filter((voteId) => voteId.toString() !== _id);
            await reply.save();
            const status = await models_1.Vote.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = VoteRepository;
