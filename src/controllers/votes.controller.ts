import { VoteInterface } from '../interfaces';
import { validateVote } from '../validations';
import { Request, Response, NextFunction } from "express";
import { VoteService } from '../services';
import { ErrorResponse } from '../utils';

interface CustomRequest extends Request {
    body: VoteInterface;
}

interface CustomDeleteRequest extends Request {
    params: {
        voteId: string
    }
}

const service = new VoteService()

export const getVotes = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetVotes();
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const addVote = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        validateVote(req.body)
        const { data } = await service.AddVote(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const deleteVote = async (req: CustomDeleteRequest, res: Response, next: NextFunction) => {
    const { voteId } = req.params;
  
    try {
      if(!voteId) {
        throw new ErrorResponse("voteId is required", 400)
      }
      const { data } = await service.DeleteVote(voteId);
    return res.json(data);
    } catch (error) {
      next(error)
    }
  };