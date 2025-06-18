import * as yup from 'yup';
import { VoteInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateVote = async (
  vote: VoteInterface,
) => {
    const userId = mongoose.Types.ObjectId.isValid(vote.userId.toString())
    const replyId = mongoose.Types.ObjectId.isValid(vote.replyId.toString())
    const discussionId = mongoose.Types.ObjectId.isValid(vote.discussionId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(vote.courseId.toString())
    const schema = yup.object().shape({
        voteType: yup.string().required()
    });

    if(!userId || !replyId || !discussionId || !courseId) return

    return await schema.validate(vote);
};