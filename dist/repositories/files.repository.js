"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//Dealing with data base operations
class FilesRepository {
    async DeleteFile(public_id) {
        try {
            const response = await cloudinary_1.default.v2.uploader.destroy(public_id, (error, result) => {
                if (error) {
                    throw new utils_1.ErrorResponse(error.message, 400);
                }
                console.log(result);
                return result;
            });
            return response;
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
}
exports.default = FilesRepository;
