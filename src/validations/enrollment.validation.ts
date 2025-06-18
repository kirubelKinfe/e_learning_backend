import * as yup from 'yup';
import { EnrollmentInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateEnrollment = async (
  enrollment: EnrollmentInterface,
) => {
    const userId = mongoose.Types.ObjectId.isValid(enrollment.userId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(enrollment.courseId.toString())
    const schema = yup.object().shape({
        process: yup.number().optional()
    });

    if(!userId || !courseId ) return

    return await schema.validate(enrollment);
};