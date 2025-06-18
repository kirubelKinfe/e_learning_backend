"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class AuthService {
    constructor() {
        this.repository = new repositories_1.AuthRepository();
    }
    async Register(newUser) {
        try {
            const { user, token } = await this.repository.RegisterUser(newUser);
            return (0, utils_1.FormateData)({ status: true, token });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async Login(loginData) {
        try {
            const token = await this.repository.LoginUser(loginData);
            return (0, utils_1.FormateData)({ status: true, token: token });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async ForgotPassword(email) {
        try {
            const data = await this.repository.ForgotPassword(email);
            return (0, utils_1.FormateData)({ status: true, data: data });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async ResetPassword(password, email) {
        try {
            const data = await this.repository.ResetPassword(password, email);
            return (0, utils_1.FormateData)({ status: true, data: data });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = AuthService;
