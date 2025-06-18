"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class CourseRepository {
    async GetCourses(query) {
        try {
            let CoursesQuery = models_1.Course.find();
            //convert query strings to number
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 3;
            const skip = (page - 1) * limit;
            const total = await models_1.Course.countDocuments();
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            CoursesQuery = CoursesQuery.populate({
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
            })
                .populate('instructorId')
                .populate({
                path: 'reviews',
                populate: { path: 'userId' }
            })
                .populate({
                path: 'discussions',
                populate: [
                    {
                        path: 'replies',
                        model: 'Reply',
                        populate: ({
                            path: 'author',
                            model: 'User'
                        })
                    },
                    {
                        path: 'author',
                        model: 'User',
                    },
                    {
                        path: 'courseId',
                        model: 'Course',
                    }
                ]
            });
            //Filtering/searching
            if (query.category) {
                CoursesQuery = CoursesQuery.find({
                    category: { $regex: query.category, $options: "i" },
                });
            }
            if (query.name) {
                CoursesQuery = CoursesQuery.find({
                    title: { $regex: query.name, $options: "i" },
                });
            }
            if (query.instructor) {
                CoursesQuery = CoursesQuery.find({
                    instructorId: query.instructor
                });
            }
            // Execute query
            const results = await CoursesQuery.find().skip(skip).limit(limit);
            //pagination results
            let pagination = {};
            //add next
            if (endIndex < total) {
                if (results.length >= limit) {
                    pagination = {
                        ...pagination,
                        next: {
                            page: page + 1,
                            limit,
                        }
                    };
                }
            }
            //add prev
            if (startIndex > 0) {
                pagination = {
                    ...pagination,
                    prev: {
                        page: page - 1,
                        limit,
                    }
                };
            }
            return {
                total,
                pagination,
                results: results.length,
                status: "success",
                message: results.length === 0 ? "No Data Found" : "Data fetched successfully",
                data: results,
            };
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseById(courseId) {
        try {
            const courses = await models_1.Course.find({ _id: courseId })
                .populate({
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
            })
                .populate('instructorId')
                .populate({
                path: 'reviews',
                populate: { path: 'userId' }
            })
                .populate({
                path: 'discussions',
                populate: [
                    {
                        path: 'replies',
                        model: 'Reply',
                        populate: ({
                            path: 'author',
                            model: 'User'
                        })
                    },
                    {
                        path: 'author',
                        model: 'User',
                    },
                    {
                        path: 'courseId',
                        model: 'Course',
                    }
                ]
            });
            return courses;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetCourseByDepartment(category) {
        try {
            const courses = await models_1.Course.find({ category: category })
                .populate({
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
            })
                .populate('instructorId')
                .populate({
                path: 'reviews',
                populate: { path: 'userId' }
            })
                .populate({
                path: 'discussions',
                populate: { path: 'replies' }
            });
            return courses;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async CreateCourse(newCourse) {
        const { title, category, instructorId } = newCourse;
        console.log(newCourse);
        try {
            const course = await models_1.Course.create({
                title, category, instructorId
            });
            const user = await models_1.User.findOne({ _id: instructorId });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            const coursesCreated = user.coursesCreated;
            await models_1.User.updateOne({ _id: instructorId }, {
                $set: {
                    coursesCompleted: [...coursesCreated, course._id]
                }
            });
            return course;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async PublishCourse(publishCourse) {
        const { _id } = publishCourse;
        try {
            const course = await models_1.Course.findOne({ _id });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            await models_1.Course.updateOne({ _id }, {
                $set: { ...publishCourse }
            });
            return course;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteCourse(_id) {
        try {
            const course = await models_1.Course.findOne({ _id });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            await models_1.Module.deleteMany({ courseId: _id });
            await models_1.Lecture.deleteMany({ courseId: _id });
            await models_1.Resource.deleteMany({ courseId: _id });
            await models_1.Quiz.deleteMany({ courseId: _id });
            await models_1.Question.deleteMany({ courseId: _id });
            const status = await models_1.Course.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = CourseRepository;
