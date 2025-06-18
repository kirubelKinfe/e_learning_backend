"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_1 = require("../repositories");
const utils_1 = require("../utils");
// All Business logic will be here
class GenerateCertificateService {
    constructor() {
        this.repository = new repositories_1.GenerateCertificateRepository();
    }
    async GenerateCertificate(certificateData) {
        try {
            const data = await this.repository.GenerateCertificate(certificateData);
            return (0, utils_1.FormateData)({ status: true, data: data });
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = GenerateCertificateService;
