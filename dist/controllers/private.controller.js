"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrivateData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const services_1 = require("../services");
const utils_1 = require("../utils");
const service = new services_1.UserService();
const getPrivateData = async (req, res, next) => {
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(req.user._id);
        if (isId) {
            const { data } = await service.GetUserById(req.user._id);
            return res.json(data);
        }
        else {
            throw new utils_1.ErrorResponse("Not a valid userId", 400);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getPrivateData = getPrivateData;
