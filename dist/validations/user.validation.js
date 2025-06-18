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
exports.validateResetToken = exports.validateForgotPassword = exports.validateUserUpdate = exports.validateUserLogin = exports.validateUserRegister = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yup = __importStar(require("yup"));
const validateUserRegister = async (user) => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        profilePic: yup.string().optional(),
        password: yup.string().required(),
        role: yup.string().optional()
    });
    return await schema.validate(user);
};
exports.validateUserRegister = validateUserRegister;
const validateUserLogin = async (user) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    return await schema.validate(user);
};
exports.validateUserLogin = validateUserLogin;
const validateUserUpdate = async (user) => {
    const _id = mongoose_1.default.Types.ObjectId.isValid(user._id.toString());
    const schema = yup.object().shape({
        firstName: yup.string().optional(),
        lastName: yup.string().optional(),
        profilePic: yup.string().optional(),
        email: yup.string().email().optional(),
        password: yup.string().optional(),
        role: yup.string().optional()
    });
    if (!_id)
        return;
    return await schema.validate(user);
};
exports.validateUserUpdate = validateUserUpdate;
const validateForgotPassword = async (user) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
    });
    return await schema.validate(user);
};
exports.validateForgotPassword = validateForgotPassword;
const validateResetToken = async (user) => {
    const schema = yup.object().shape({
        resetToken: yup.string().required()
    });
    return await schema.validate(user);
};
exports.validateResetToken = validateResetToken;
