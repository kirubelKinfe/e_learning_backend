"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateData = exports.sendMail = exports.ErrorResponse = void 0;
var error_response_1 = require("./error-response");
Object.defineProperty(exports, "ErrorResponse", { enumerable: true, get: function () { return __importDefault(error_response_1).default; } });
var sendEmail_1 = require("./sendEmail");
Object.defineProperty(exports, "sendMail", { enumerable: true, get: function () { return __importDefault(sendEmail_1).default; } });
const FormateData = (data) => {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
};
exports.FormateData = FormateData;
