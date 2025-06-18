"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const services_1 = require("../services");
const service = new services_1.FilesService();
const deleteFile = async (req, res, next) => {
    const { public_id } = req.body;
    console.log(public_id);
    try {
        const { data } = await service.DeleteFile(public_id);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteFile = deleteFile;
