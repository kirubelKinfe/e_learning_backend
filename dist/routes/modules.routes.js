"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_controller_1 = require("../controllers/modules.controller");
const router = express_1.default.Router();
router.route('/')
    .get(modules_controller_1.getModules)
    .post(modules_controller_1.addModule)
    .put(modules_controller_1.updateModule);
router.route('/:moduleId')
    .delete(modules_controller_1.deleteModule);
module.exports = router;
