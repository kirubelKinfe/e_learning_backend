"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVote = exports.addVote = exports.getVotes = void 0;
const validations_1 = require("../validations");
const services_1 = require("../services");
const utils_1 = require("../utils");
const service = new services_1.VoteService();
const getVotes = async (req, res, next) => {
    try {
        const { data } = await service.GetVotes();
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.getVotes = getVotes;
const addVote = async (req, res, next) => {
    try {
        (0, validations_1.validateVote)(req.body);
        const { data } = await service.AddVote(req.body);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.addVote = addVote;
const deleteVote = async (req, res, next) => {
    const { voteId } = req.params;
    try {
        if (!voteId) {
            throw new utils_1.ErrorResponse("voteId is required", 400);
        }
        const { data } = await service.DeleteVote(voteId);
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
};
exports.deleteVote = deleteVote;
