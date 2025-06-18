"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = __importDefault(require("../utils/error-response"));
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    if (err.code === 11000) {
        const message = `Duplicate Field Value Enter`;
        error = new error_response_1.default(message, 400);
    }
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message)
            .join(', ');
        error = new error_response_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        status: false,
        error: error.message || 'Server Error',
    });
};
exports.default = errorHandler;
