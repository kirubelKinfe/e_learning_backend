import * as yup from 'yup';
import { LectureInterface, LectureUpdateInterface, VideoLectureUploadInterface } from '../interfaces';
import mongoose from 'mongoose';

export const validateLecture = async (
  lecture: LectureInterface,
) => {
    const moduleId = mongoose.Types.ObjectId.isValid(lecture.moduleId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(lecture.courseId.toString())
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().optional(),
        videoUrl: yup.string().optional()
    });

    if(!moduleId || !courseId) return

    return await schema.validate(lecture);
};

export const validateUploadVideoLecture = async (
  lecture: VideoLectureUploadInterface,
) => {
    const moduleId = mongoose.Types.ObjectId.isValid(lecture.moduleId.toString())
    const courseId = mongoose.Types.ObjectId.isValid(lecture.courseId.toString())
    const _id = mongoose.Types.ObjectId.isValid(lecture._id.toString())
    const schema = yup.object().shape({
        videoUrl: yup.string().optional(),
        public_id: yup.string().optional(),
        duration: yup.number().optional()
    });

    if(!_id || !moduleId || !courseId) return

    return await schema.validate(lecture);
};

export const validateUpdateLecture = async (
  lecture: LectureUpdateInterface,
) => {
    const _id = mongoose.Types.ObjectId.isValid(lecture._id.toString())
    const schema = yup.object().shape({
        title: yup.string().optional(),
        description: yup.string().optional(),
        article: yup.string().optional()
    });

    if(!_id) return

    return await schema.validate(lecture);
};