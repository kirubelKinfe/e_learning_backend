"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class ModuleRepository {
    async GetModules() {
        try {
            const modules = await models_1.Module.find()
                .populate({
                path: 'lectures',
                populate: { path: 'resources' }
            });
            return modules;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddModule(newModule) {
        const { title, description, courseId } = newModule;
        try {
            const module = await models_1.Module.create({
                title, description, courseId
            });
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            const modules = course.modules;
            await models_1.Course.updateOne({ _id: courseId }, {
                $set: {
                    modules: [...modules, module._id]
                }
            });
            return module;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateModule(moduleInfo) {
        const { _id, title, description } = moduleInfo;
        try {
            const module = await models_1.Module.findOne({ _id });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            module.title = title;
            module.description = description;
            await module.save();
            return module;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteModule(_id) {
        try {
            const module = await models_1.Module.findOne({ _id });
            if (!module) {
                throw new utils_1.ErrorResponse("Module not found", 400);
            }
            const { courseId } = module;
            const course = await models_1.Course.findOne({ _id: courseId });
            if (!course) {
                throw new utils_1.ErrorResponse("Course not found", 400);
            }
            course.modules = course.modules.filter((moduleId) => moduleId.toString() !== _id);
            await course.save();
            await models_1.Lecture.deleteMany({ moduleId: _id });
            await models_1.Resource.deleteMany({ moduleId: _id });
            await models_1.Quiz.deleteMany({ moduleId: _id });
            await models_1.Question.deleteMany({ moduleId: _id });
            const status = await models_1.Module.deleteOne({ _id });
            console.log(status);
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ModuleRepository;
