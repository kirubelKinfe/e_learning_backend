"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLecture = exports.updateLecture = exports.uploadVideoLecture = exports.addLecture = exports.getLectureWithId = exports.getLectures = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const mongoose_1 = __importDefault(require("mongoose"));
const service = new services_1.LectureService();
const getLectures = async (req, res, next) => {
    try {
        const { data } = await service.GetLectures();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getLectures = getLectures;
const getLectureWithId = async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        const isId = mongoose_1.default.Types.ObjectId.isValid(lectureId);
        if (isId) {
            const { data } = await service.GetLectureWithId(lectureId);
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
exports.getLectureWithId = getLectureWithId;
const addLecture = async (req, res, next) => {
    try {
        await (0, validations_1.validateLecture)(req.body);
        const { data } = await service.AddLecture(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addLecture = addLecture;
const uploadVideoLecture = async (req, res, next) => {
    try {
        console.log(req.body);
        await (0, validations_1.validateUploadVideoLecture)(req.body);
        const { data } = await service.UploadVideoLecture(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.uploadVideoLecture = uploadVideoLecture;
const updateLecture = async (req, res, next) => {
    try {
        console.log(req.body);
        await (0, validations_1.validateUpdateLecture)(req.body);
        const { data } = await service.UpdateLecture(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.updateLecture = updateLecture;
const deleteLecture = async (req, res, next) => {
    const { lectureId } = req.params;
    try {
        if (!lectureId) {
            throw new utils_1.ErrorResponse("_id is required", 400);
        }
        const { data } = await service.DeleteLecture(lectureId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteLecture = deleteLecture;
