"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateQuestion = exports.validateQuestion = void 0;
const yup = __importStar(require("yup"));
const mongoose_1 = __importDefault(require("mongoose"));
const validateQuestion = async (question) => {
    const quizId = mongoose_1.default.Types.ObjectId.isValid(question.quizId.toString());
    const moduleId = mongoose_1.default.Types.ObjectId.isValid(question.moduleId.toString());
    const courseId = mongoose_1.default.Types.ObjectId.isValid(question.courseId.toString());
    const schema = yup.object().shape({
        title: yup.string().required(),
        answer: yup.string().required()
    });
    if (!quizId || !moduleId || !courseId)
        return;
    return await schema.validate(question);
};
exports.validateQuestion = validateQuestion;
const validateUpdateQuestion = async (question) => {
    const _id = mongoose_1.default.Types.ObjectId.isValid(question._id.toString());
    const schema = yup.object().shape({
        title: yup.string().optional(),
        answer: yup.string().optional(),
        choices: yup.array().optional()
    });
    if (!_id)
        return;
    return await schema.validate(question);
};
exports.validateUpdateQuestion = validateUpdateQuestion;
