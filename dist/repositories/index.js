"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesRepository = exports.GenerateCertificateRepository = exports.EnrollmentRepository = exports.VoteRepository = exports.ReplyRepository = exports.DiscussionRepository = exports.QuestionRepository = exports.QuizRepository = exports.ReviewRepository = exports.ResourceRepository = exports.LectureRepository = exports.ModuleRepository = exports.CourseProgressRepository = exports.CourseRepository = exports.UserRepository = exports.AuthRepository = void 0;
var auth_repository_1 = require("./auth.repository");
Object.defineProperty(exports, "AuthRepository", { enumerable: true, get: function () { return __importDefault(auth_repository_1).default; } });
var user_repository_1 = require("./user.repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return __importDefault(user_repository_1).default; } });
var course_repository_1 = require("./course.repository");
Object.defineProperty(exports, "CourseRepository", { enumerable: true, get: function () { return __importDefault(course_repository_1).default; } });
var courseprogress_repository_1 = require("./courseprogress.repository");
Object.defineProperty(exports, "CourseProgressRepository", { enumerable: true, get: function () { return __importDefault(courseprogress_repository_1).default; } });
var module_repository_1 = require("./module.repository");
Object.defineProperty(exports, "ModuleRepository", { enumerable: true, get: function () { return __importDefault(module_repository_1).default; } });
var lecture_repository_1 = require("./lecture.repository");
Object.defineProperty(exports, "LectureRepository", { enumerable: true, get: function () { return __importDefault(lecture_repository_1).default; } });
var resource_repository_1 = require("./resource.repository");
Object.defineProperty(exports, "ResourceRepository", { enumerable: true, get: function () { return __importDefault(resource_repository_1).default; } });
var review_repository_1 = require("./review.repository");
Object.defineProperty(exports, "ReviewRepository", { enumerable: true, get: function () { return __importDefault(review_repository_1).default; } });
var quiz_repository_1 = require("./quiz.repository");
Object.defineProperty(exports, "QuizRepository", { enumerable: true, get: function () { return __importDefault(quiz_repository_1).default; } });
var question_repository_1 = require("./question.repository");
Object.defineProperty(exports, "QuestionRepository", { enumerable: true, get: function () { return __importDefault(question_repository_1).default; } });
var discussion_repository_1 = require("./discussion.repository");
Object.defineProperty(exports, "DiscussionRepository", { enumerable: true, get: function () { return __importDefault(discussion_repository_1).default; } });
var reply_repository_1 = require("./reply.repository");
Object.defineProperty(exports, "ReplyRepository", { enumerable: true, get: function () { return __importDefault(reply_repository_1).default; } });
var vote_repository_1 = require("./vote.repository");
Object.defineProperty(exports, "VoteRepository", { enumerable: true, get: function () { return __importDefault(vote_repository_1).default; } });
var enrollment_repository_1 = require("./enrollment.repository");
Object.defineProperty(exports, "EnrollmentRepository", { enumerable: true, get: function () { return __importDefault(enrollment_repository_1).default; } });
var generatecertificate_repository_1 = require("./generatecertificate.repository");
Object.defineProperty(exports, "GenerateCertificateRepository", { enumerable: true, get: function () { return __importDefault(generatecertificate_repository_1).default; } });
var files_repository_1 = require("./files.repository");
Object.defineProperty(exports, "FilesRepository", { enumerable: true, get: function () { return __importDefault(files_repository_1).default; } });
