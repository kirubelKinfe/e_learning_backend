"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class LectureService {
    constructor() {
        this.repository = new repositories_1.LectureRepository();
    }
    async GetLectures() {
        try {
            const lectures = await this.repository.GetLectures();
            return (0, utils_1.FormateData)({ status: true, data: lectures });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async GetLectureWithId(lectureId) {
        try {
            const lectures = await this.repository.GetLectureWithId(lectureId);
            return (0, utils_1.FormateData)({ status: true, data: lectures });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async AddLecture(newLecture) {
        try {
            const lecutre = await this.repository.AddLecture(newLecture);
            return (0, utils_1.FormateData)({ status: true, data: lecutre });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UploadVideoLecture(lectureInfo) {
        try {
            const updateStatus = await this.repository.UploadVideoLecture(lectureInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async UpdateLecture(lectureInfo) {
        try {
            const updateStatus = await this.repository.UpdateLecture(lectureInfo);
            return (0, utils_1.FormateData)({ status: true, data: updateStatus });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async DeleteLecture(_id) {
        try {
            const data = await this.repository.DeleteLecture(_id);
            return (0, utils_1.FormateData)(data);
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = LectureService;
