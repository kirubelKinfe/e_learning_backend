"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
//Dealing with data base operations
class ResourceRepository {
    async GetResources() {
        try {
            const resources = await models_1.Resource.find();
            return resources;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddResource(newResource) {
        const { title, url, public_id, lectureId, moduleId, courseId } = newResource;
        console.log(newResource);
        try {
            const resource = await models_1.Resource.create({
                title, url, public_id, lectureId, moduleId, courseId
            });
            const lecture = await models_1.Lecture.findOne({ _id: lectureId });
            if (!lecture) {
                throw new utils_1.ErrorResponse("Lecture not found", 400);
            }
            const resources = lecture.resources;
            await models_1.Lecture.updateOne({ _id: lectureId }, {
                $set: {
                    resources: [...resources, resource._id]
                }
            });
            return resource;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateResource(updateResource) {
        const { _id, title, url, public_id } = updateResource;
        console.log(updateResource);
        try {
            const resource = await models_1.Resource.find({ _id });
            if (!resource) {
                throw new utils_1.ErrorResponse("Resource not found", 400);
            }
            await models_1.Resource.updateOne({ _id }, {
                $set: {
                    title,
                    url,
                    public_id
                }
            });
            return resource;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteResource(_id) {
        try {
            const resource = await models_1.Resource.findOne({ _id });
            if (!resource) {
                throw new utils_1.ErrorResponse("Resource not found", 400);
            }
            const { lectureId } = resource;
            const lecture = await models_1.Lecture.findOne({ _id: lectureId });
            if (!lecture) {
                throw new utils_1.ErrorResponse("Lecture not found", 400);
            }
            lecture.resources = lecture.resources.filter((resourceId) => resourceId.toString() !== _id);
            await lecture.save();
            const status = await models_1.Resource.deleteOne({ _id });
            return status;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = ResourceRepository;
