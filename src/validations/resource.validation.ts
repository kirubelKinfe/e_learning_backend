import * as yup from 'yup';
import { ResourceInterface, ResourceUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateResource = async (
  resource: ResourceInterface,
) => {
    const lectureId = mongoose.Types.ObjectId.isValid(resource.lectureId.toString())
    const moduleId = mongoose.Types.ObjectId.isValid(resource.moduleId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(resource.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        url: yup.string().optional()
    });

    if(!lectureId || !moduleId || !courseId) return

    return await schema.validate(resource);
};

export const validateUpdateResource = async (
  resource: ResourceUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(resource._id.toString())
    const schema = yup.object().shape({
        title: yup.string().optional(),
        url: yup.string().optional(),
        public_id: yup.string().optional()
    });

    if(!_id) return

    return await schema.validate(resource);
};