"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class LectureRepository {
    async GetLectures() {
        try {
            const lectures = await models_1.Lecture.find()
                .populate({
                path: 'resources'
            });
            return lectures;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetLectureWithId(lectureId) {
        try {
            const lectures = await models_1.Lecture.find({ _id: lectureId })
                .populate({
                path: 'resources'
            });
            return lectures;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddLecture(newLecture) {
        const { title, description, moduleId, courseId } = newLecture;
        try {
            const lecture = await models_1.Lecture.create({
                title, description, moduleId, courseId
            });
            const module = await models_1.Module.findOne({ _id: moduleId });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            const lectures = module.lectures;
            await models_1.Module.updateOne({ _id: moduleId }, {
                $set: {
                    lectures: [...lectures, lecture._id]
                }
            });
            return lecture;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UploadVideoLecture(LectureInfo) {
        const { _id, courseId, moduleId, duration, videoUrl, public_id } = LectureInfo;
        try {
            const lecture = await models_1.Lecture.findOne({ _id });
            if (!lecture) {
                throw new utils_1.ErrorResponse("Lecture not found", 400);
            }
            const updateStatus = await models_1.Lecture.updateOne({ _id }, {
                $set: {
                    duration,
                    videoUrl,
                    public_id
                }
            });
            const courseLectures = await models_1.Lecture.find({ moduleId });
            if (!courseLectures) {
                throw new utils_1.ErrorResponse("Lectures not found", 400);
            }
            let totalDuration = 0;
            courseLectures?.forEach((lecture) => {
                totalDuration += Number.parseFloat(lecture.duration.toString());
            });
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    duration: totalDuration
                }
            });
            return updateStatus;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateLecture(LectureInfo) {
        const { _id, title, article, description } = LectureInfo;
        try {
            const lecture = await models_1.Lecture.findOne({ _id });
            if (!lecture) {
                throw new utils_1.ErrorResponse("Lecture not found", 400);
            }
            const updateStatus = await models_1.Lecture.updateOne({ _id }, {
                $set: {
                    title,
                    article,
                    description
                }
            });
            return updateStatus;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteLecture(_id) {
        try {
            const lecture = await models_1.Lecture.findOne({ _id });
            if (!lecture) {
                throw new utils_1.ErrorResponse("Lecture not found", 400);
            }
            await models_1.Resource.deleteMany({ courseId: _id });
            const { moduleId } = lecture;
            const module = await models_1.Module.findOne({ _id: moduleId });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            module.lectures = module.lectures.filter((lectureId) => lectureId.toString() !== _id);
            console.log(module);
            await module.save();
            await models_1.Resource.deleteMany({ lectureId: _id });
            const status = await models_1.Lecture.deleteOne({ _id });
            console.log(status);
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = LectureRepository;
