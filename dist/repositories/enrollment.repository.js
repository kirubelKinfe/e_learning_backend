"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class EnrollmentRepository {
    async GetEnrollments() {
        try {
            const enrollments = await models_1.Enrollment.find();
            return enrollments;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetEnrollment(userId, courseId) {
        try {
            const enrollments = await models_1.Enrollment.find({ userId, courseId });
            return enrollments;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddEnrollment(newVote) {
        const { userId, courseId } = newVote;
        try {
            const enrolledStatus = await models_1.Enrollment.findOne({ userId, courseId });
            if (enrolledStatus) {
                throw new utils_1.ErrorResponse("User Already Enrolled", 400);
            }
            const course = await models_1.Course.findOne({ _id: courseId }).populate({
                path: 'modules',
                populate: [
                    {
                        path: 'quizzes',
                        model: 'Quiz',
                        populate: {
                            path: 'questions',
                        }
                    },
                    {
                        path: 'lectures',
                        model: 'Lecture',
                        populate: 'resources'
                    }
                ]
            });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            let lectureProgress = [];
            course?.modules.forEach((module) => {
                module?.lectures.forEach((lecture) => (lectureProgress.push({ lectureId: lecture._id, progress: 0 })));
            });
            await models_1.CourseProgress.create({
                userId,
                courseId,
                lectureProgress
            });
            const students = course.students;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    students: [...students, userId]
                }
            });
            const user = await models_1.User.findOne({ _id: userId });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            const coursesEnrolled = user.coursesEnrolled;
            await models_1.User.updateOne({ _id: userId }, {
                $set: {
                    coursesEnrolled: [...coursesEnrolled, courseId]
                }
            });
            const enrollment = await models_1.Enrollment.create({
                userId, courseId
            });
            return enrollment;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteEnrollment(_id) {
        try {
            const enrollment = await models_1.Enrollment.findOne({ _id });
            if (!enrollment) {
                throw new utils_1.ErrorResponse("Enrollment not found", 400);
            }
            const { userId, courseId } = enrollment;
            const user = await models_1.User.findOne({ _id: userId });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            user.coursesEnrolled = user.coursesEnrolled.filter((courseId) => courseId.toString() !== _id);
            await user.save();
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            course.students = course.students.filter((studentId) => studentId !== userId);
            await course.save();
            const status = await models_1.Enrollment.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = EnrollmentRepository;
