"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class DiscussionRepository {
    async GetDiscussions() {
        try {
            const discussions = await models_1.Discussion.find()
                .populate({
                path: 'replies',
                populate: { path: 'votes' }
            })
                .populate('author')
                .populate('courseId');
            return discussions;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddDiscussion(newDiscussion) {
        const { author, title, textBody, courseId } = newDiscussion;
        try {
            const discussion = await models_1.Discussion.create({
                author, title, textBody, courseId
            });
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            const discussions = course.discussions;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    discussions: [...discussions, discussion._id]
                }
            });
            return discussion;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateDiscussion(discussionInfo) {
        const { _id, title, textBody } = discussionInfo;
        try {
            const discussion = await models_1.Discussion.findOne({ _id });
            if (!discussion) {
                throw new utils_1.ErrorResponse("Discussion not found", 400);
            }
            await models_1.Discussion.updateOne({ _id }, {
                $set: {
                    title,
                    textBody
                }
            });
            return discussion;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteDiscussion(_id) {
        try {
            const discussion = await models_1.Discussion.findOne({ _id });
            if (!discussion) {
                throw new utils_1.ErrorResponse("Discussion not found", 400);
            }
            await models_1.Reply.deleteMany({ courseId: _id });
            await models_1.Vote.deleteMany({ courseId: _id });
            const { courseId } = discussion;
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            course.discussions = course.discussions.filter((discussionId) => discussionId.toString() !== _id);
            await course.save();
            await models_1.Reply.deleteMany({ discussionId: _id });
            await models_1.Vote.deleteMany({ discussionId: _id });
            const status = await models_1.Discussion.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = DiscussionRepository;
