"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const votes_controller_1 = require("../controllers/votes.controller");
const router = express_1.default.Router();
router.route('/')
    .get(votes_controller_1.getVotes)
    .post(votes_controller_1.addVote);
router.route('/:voteId')
    .delete(votes_controller_1.deleteVote);
module.exports = router;
