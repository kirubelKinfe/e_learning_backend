"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCertificate = void 0;
const services_1 = require("../services");
const service = new services_1.GenerateCertificateService();
const generateCertificate = async (req, res, next) => {
    try {
        const { data } = await service.GenerateCertificate(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.generateCertificate = generateCertificate;
