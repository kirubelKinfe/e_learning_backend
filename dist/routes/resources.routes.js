"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resources_controller_1 = require("../controllers/resources.controller");
const router = express_1.default.Router();
router.route('/')
    .get(resources_controller_1.getResources)
    .post(resources_controller_1.addResource)
    .put(resources_controller_1.updateResource);
router.route('/:resourceId')
    .delete(resources_controller_1.deleteResource);
module.exports = router;
