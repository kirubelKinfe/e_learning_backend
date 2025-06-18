"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateResource = exports.validateResource = void 0;
const yup = __importStar(require("yup"));
const mongoose_1 = __importDefault(require("mongoose"));
const validateResource = async (resource) => {
    const lectureId = mongoose_1.default.Types.ObjectId.isValid(resource.lectureId.toString());
    const moduleId = mongoose_1.default.Types.ObjectId.isValid(resource.moduleId.toString());
    const courseId = mongoose_1.default.Types.ObjectId.isValid(resource.courseId.toString());
    const schema = yup.object().shape({
        title: yup.string().required(),
        url: yup.string().optional()
    });
    if (!lectureId || !moduleId || !courseId)
        return;
    return await schema.validate(resource);
};
exports.validateResource = validateResource;
const validateUpdateResource = async (resource) => {
    const _id = mongoose_1.default.Types.ObjectId.isValid(resource._id.toString());
    const schema = yup.object().shape({
        title: yup.string().optional(),
        url: yup.string().optional(),
        public_id: yup.string().optional()
    });
    if (!_id)
        return;
    return await schema.validate(resource);
};
exports.validateUpdateResource = validateUpdateResource;
