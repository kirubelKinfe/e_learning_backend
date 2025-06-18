import * as yup from 'yup';
import { ModuleInterface, ModuleUpdateInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateModule = async (
  module: ModuleInterface,
) => {
    const courseId = mongoose.Types.ObjectId.isValid(module.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional()
    });

    if(!courseId) return

    return await schema.validate(module);
};

export const validateModuleUpdate = async (
  module: ModuleUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(module._id.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional()
    });

    if(!_id) return

    return await schema.validate(module);
};