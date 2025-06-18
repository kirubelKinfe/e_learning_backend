"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class UserService {
    constructor() {
        this.repository = new repositories_1.UserRepository();
    }
    async GetUsers() {
        try {
            const users = await this.repository.GetUsers();
            return (0, utils_1.FormateData)({ status: true, data: users });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetUserById(userId) {
        try {
            const user = await this.repository.GetUserById(userId);
            return (0, utils_1.FormateData)({ status: true, data: user });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateUser(updateData) {
        try {
            const updateStatus = await this.repository.UpdateUser(updateData);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteUser(_id) {
        try {
            const data = await this.repository.DeleteUser(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = UserService;
