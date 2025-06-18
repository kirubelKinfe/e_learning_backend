"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const discussions_controller_1 = require("../controllers/discussions.controller");
const router = express_1.default.Router();
router.route('/')
    .get(discussions_controller_1.getDiscussions)
    .post(discussions_controller_1.addDiscussion)
    .put(discussions_controller_1.updateDiscussion);
router.route('/:discussionId')
    .delete(discussions_controller_1.deleteDiscussion);
module.exports = router;
