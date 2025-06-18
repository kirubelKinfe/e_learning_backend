import * as yup from 'yup';
import { DiscussionInterface, DiscussionUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateDiscussion = async (
  discussion: DiscussionInterface,
) => {
    const author = mongoose.Types.ObjectId.isValid(discussion.author.toString())
    const courseId = mongoose.Types.ObjectId.isValid(discussion.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        textBody: yup.string().optional()
    });

    if(!author || !courseId) return

    return await schema.validate(discussion);
};

export const validateUpdateDiscussion = async (
  discussion: DiscussionUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(discussion._id.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        textBody: yup.string().optional()
    });

    if(!_id) return

    return await schema.validate(discussion);
};