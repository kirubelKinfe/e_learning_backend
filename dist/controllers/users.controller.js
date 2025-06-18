"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = void 0;
const utils_1 = require("../utils");
const user_validation_1 = require("../validations/user.validation");
const services_1 = require("../services");
const mongoose_1 = __importDefault(require("mongoose"));
const service = new services_1.UserService();
const getUsers = async (req, res, next) => {
    try {
        const { data } = await service.GetUsers();
        return res.json(data);
    }
    catch (error) {
        return next(new utils_1.ErrorResponse(error.message, 400));
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(userId);
        if (isId) {
            const { data } = await service.GetUserById(userId);
            return res.json(data);
        }
        else {
            throw new utils_1.ErrorResponse("Not a valid Id", 400);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        await (0, user_validation_1.validateUserUpdate)(req.body);
        const { data } = await service.UpdateUser(req.body);
        return res.json(data);
    }
    catch (error) {
        return next(new utils_1.ErrorResponse(error.message, 400));
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
        if (!userId) {
            throw new utils_1.ErrorResponse("userId is required", 400);
        }
        const { data } = await service.DeleteUser(userId);
        return res.json(data);
    }
    catch (error) {
        return next(new utils_1.ErrorResponse(error.message, 400));
    }
};
exports.deleteUser = deleteUser;
