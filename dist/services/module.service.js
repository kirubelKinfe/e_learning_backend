"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class ModuleService {
    constructor() {
        this.repository = new repositories_1.ModuleRepository();
    }
    async GetModules() {
        try {
            const modules = await this.repository.GetModules();
            return (0, utils_1.FormateData)({ status: true, data: modules });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddModule(newModule) {
        try {
            const module = await this.repository.AddModule(newModule);
            return (0, utils_1.FormateData)({ status: true, data: module });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateModule(moduleInfo) {
        try {
            const updateStatus = await this.repository.UpdateModule(moduleInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteModule(_id) {
        try {
            const data = await this.repository.DeleteModule(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ModuleService;
