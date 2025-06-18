"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.addResource = exports.getResources = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const service = new services_1.ResourceService();
const getResources = async (req, res, next) => {
    try {
        const { data } = await service.GetResources();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getResources = getResources;
const addResource = async (req, res, next) => {
    try {
        await (0, validations_1.validateResource)(req.body);
        const { data } = await service.AddResource(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addResource = addResource;
const updateResource = async (req, res, next) => {
    try {
        await (0, validations_1.validateUpdateResource)(req.body);
        const { data } = await service.UpdateResource(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateResource = updateResource;
const deleteResource = async (req, res, next) => {
    const { resourceId } = req.params;
    try {
        if (!resourceId) {
            throw new utils_1.ErrorResponse("resourceId is required", 400);
        }
        const { data } = await service.DeleteResource(resourceId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteResource = deleteResource;
