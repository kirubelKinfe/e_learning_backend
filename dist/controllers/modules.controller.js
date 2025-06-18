"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteModule = exports.updateModule = exports.addModule = exports.getModules = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const service = new services_1.ModuleService();
const getModules = async (req, res, next) => {
    try {
        const { data } = await service.GetModules();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getModules = getModules;
const addModule = async (req, res, next) => {
    try {
        await (0, validations_1.validateModule)(req.body);
        const { data } = await service.AddModule(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addModule = addModule;
const updateModule = async (req, res, next) => {
    try {
        await (0, validations_1.validateModuleUpdate)(req.body);
        const { data } = await service.UpdateModule(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateModule = updateModule;
const deleteModule = async (req, res, next) => {
    const { moduleId } = req.params;
    try {
        if (!moduleId) {
            throw new utils_1.ErrorResponse("_id is required", 400);
        }
        const { data } = await service.DeleteModule(moduleId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteModule = deleteModule;
