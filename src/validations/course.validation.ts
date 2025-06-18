import * as yup from 'yup';
import { CreateCourseInterface, PublishCourseInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateCreateCourse = async (
  course: CreateCourseInterface,
) => {
    const instructorId = mongoose.Types.ObjectId.isValid(course.instructorId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        category: yup.string().required()
    });

    if(!instructorId) return

    return await schema.validate(course);
};

export const validatePublishCourse = async (
  course: PublishCourseInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(course._id.toString())
    const schema = yup.object().shape({
        title: yup.string().optional(),
        subtitle: yup.string().optional(),
        category: yup.string().optional(),
        status: yup.string().optional(),
        description: yup.string().optional(),
        thumbnail: yup.string().optional(),
        objectives: yup.array().of(yup.object()
                        .shape({ objective: yup.string() })).optional(),
        requirements: yup.array().of(yup.object()
                        .shape({ requirement: yup.string() })).optional(),
        intendedlearners: yup.array().of(yup.object()
                        .shape({ learner: yup.string() })).optional(),
    });

    if(!_id ) return

    return await schema.validate(course);
};