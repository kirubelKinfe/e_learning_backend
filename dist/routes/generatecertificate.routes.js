"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const generatecertificate_controller_1 = require("../controllers/generatecertificate.controller");
const router = express_1.default.Router();
router.route('/')
    .post(generatecertificate_controller_1.generateCertificate);
module.exports = router;
