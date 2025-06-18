"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questions_controller_1 = require("../controllers/questions.controller");
const router = express_1.default.Router();
router.route('/')
    .get(questions_controller_1.getQuestions)
    .post(questions_controller_1.addQuestion)
    .put(questions_controller_1.updateQuestion);
router.route('/:questionId')
    .delete(questions_controller_1.deleteQuestion);
module.exports = router;
