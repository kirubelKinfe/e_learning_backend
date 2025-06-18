"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class FilesService {
    constructor() {
        this.repository = new repositories_1.FilesRepository();
    }
    async DeleteFile(public_id) {
        try {
            const data = await this.repository.DeleteFile(public_id);
            return (0, utils_1.FormateData)({ status: true, data });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = FilesService;
