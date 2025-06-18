"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quizzes_controller_1 = require("../controllers/quizzes.controller");
const router = express_1.default.Router();
router.route('/')
    .get(quizzes_controller_1.getQuizzes)
    .post(quizzes_controller_1.addQuiz)
    .put(quizzes_controller_1.updateQuiz);
router.route('/:quizId')
    .delete(quizzes_controller_1.deleteQuiz);
module.exports = router;
