"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const error_response_1 = __importDefault(require("../utils/error-response"));
const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new error_response_1.default("Not authorized to access this route", 401));
    }
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const user = await models_1.User.findById(decoded.id);
        if (!user) {
            return next(new error_response_1.default("No user found with this id", 404));
        }
        else {
            req.user = user;
            next();
        }
    }
    catch (error) {
        console.log(error);
        return next(new error_response_1.default("Not authorized to access this route", 401));
    }
};
exports.authMiddleware = authMiddleware;
