"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const files_controller_1 = require("../controllers/files.controller");
const router = express_1.default.Router();
router.route('/')
    .post(files_controller_1.deleteFile);
module.exports = router;
