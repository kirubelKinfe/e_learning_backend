"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class ResourceService {
    constructor() {
        this.repository = new repositories_1.ResourceRepository();
    }
    async GetResources() {
        try {
            const resources = await this.repository.GetResources();
            return (0, utils_1.FormateData)({ status: true, data: resources });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddResource(newResource) {
        try {
            const resource = await this.repository.AddResource(newResource);
            return (0, utils_1.FormateData)({ status: true, data: resource });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateResource(updateResource) {
        try {
            const resource = await this.repository.UpdateResource(updateResource);
            return (0, utils_1.FormateData)({ status: true, data: resource });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteResource(_id) {
        try {
            const data = await this.repository.DeleteResource(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ResourceService;
