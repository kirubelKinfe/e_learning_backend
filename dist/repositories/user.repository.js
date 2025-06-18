"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class UserRepository {
    async GetUsers() {
        try {
            const users = await models_1.User.find()
                .populate({
                path: 'coursesCreated',
                populate: [
                    {
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
                    },
                    {
                        path: 'instructorId'
                    }
                ]
            })
                .populate({
                path: 'coursesEnrolled',
                populate: [
                    {
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
                    },
                    {
                        path: 'instructorId'
                    }
                ]
            })
                .populate({
                path: 'coursesCompleted',
                populate: [
                    {
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
                    },
                    {
                        path: 'instructorId'
                    }
                ]
            });
            return users;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetUserById(userId) {
        try {
            const user = await models_1.User.findOne({ _id: userId })
                .populate({
                path: 'coursesCreated',
                populate: [
                    {
                        path: 'instructorId'
                    },
                    {
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
                    },
                    {
                        path: 'reviews',
                        populate: [
                            {
                                path: 'courseId'
                            },
                            {
                                path: 'userId'
                            }
                        ]
                    },
                    {
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
                    }
                ]
            })
                .populate({
                path: 'coursesEnrolled',
                populate: [
                    {
                        path: 'instructorId'
                    },
                    {
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
                    },
                    {
                        path: 'reviews',
                        populate: [
                            {
                                path: 'courseId'
                            },
                            {
                                path: 'userId'
                            }
                        ]
                    },
                    {
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
                    }
                ]
            })
                .populate({
                path: 'coursesCompleted',
                populate: [
                    {
                        path: 'instructorId'
                    },
                    {
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
                    },
                    {
                        path: 'reviews',
                        populate: [
                            {
                                path: 'courseId'
                            },
                            {
                                path: 'userId'
                            }
                        ]
                    },
                    {
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
                    }
                ]
            });
            return user;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateUser(updateData) {
        const { _id, firstName, lastName, email, password, profilePic, role } = updateData;
        console.log(password);
        try {
            const user = await models_1.User.findOne({ _id });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            await models_1.User.updateOne({ _id }, {
                $set: {
                    firstName,
                    lastName,
                    email,
                    password,
                    profilePic,
                    role
                }
            });
            return user;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteUser(_id) {
        try {
            const user = await models_1.User.findOne({ _id });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            user.active = "diactivated";
            await user.save();
            return { status: true, data: "User Diactivated" };
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = UserRepository;
