"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.register = void 0;
const validations_1 = require("../validations");
const services_1 = require("../services");
const service = new services_1.AuthService();
const register = async (req, res, next) => {
    const newUser = req.body;
    try {
        await (0, validations_1.validateUserRegister)(newUser);
        const { data } = await service.Register(newUser);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        await (0, validations_1.validateUserLogin)(req.body);
        const { data } = await service.Login(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        await (0, validations_1.validateForgotPassword)(req.body);
        const { data } = await service.ForgotPassword(email);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    const { resetToken } = req.params;
    const { password } = req.body;
    try {
        await (0, validations_1.validateResetToken)(req.params);
        const { data } = await service.ResetPassword(password, resetToken);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
