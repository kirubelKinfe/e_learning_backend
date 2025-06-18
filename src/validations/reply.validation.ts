import * as yup from 'yup';
import { ReplyInterface, ReplyUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateReply = async (
  reply: ReplyInterface,
) => {
    const author = mongoose.Types.ObjectId.isValid(reply.author.toString())
    const discussionId = mongoose.Types.ObjectId.isValid(reply.discussionId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(reply.courseId.toString())
    const schema = yup.object().shape({
        textBody: yup.string().required()
    });

    if(!author || !discussionId || !courseId) return

    return await schema.validate(reply);
};

export const validateUpdateReply = async (
  reply: ReplyUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(reply._id.toString())
    const schema = yup.object().shape({
        textBody: yup.string().required()
    });

    if(!_id) return

    return await schema.validate(reply);
};