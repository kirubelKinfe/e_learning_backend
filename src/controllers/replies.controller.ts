import { ReplyInterface, ReplyUpdateInterface } from '../interfaces';
import { validateReply, validateUpdateReply } from '../validations';
import { Request, Response, NextFunction } from "express";
import { ReplyService } from '../services';
import { ErrorResponse } from '../utils';

interface CustomRequest extends Request {
    body: ReplyInterface;
}

interface CustomUpdateRequest extends Request {
    body: ReplyUpdateInterface;
    params: {
        replyId: string
    }
}

const service = new ReplyService()

export const getReplies = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetReplies();
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const addReply = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        validateReply(req.body)
        const { data } = await service.AddReply(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const updateReply = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    try {
        validateUpdateReply(req.body)
        const { data } = await service.UpdateReply(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const deleteReply = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
    const { replyId } = req.params;
  
    try {
      if(!replyId) {
        throw new ErrorResponse("replyId is required", 400)
      }
      const { data } = await service.DeleteReply(replyId);
    return res.json(data);
    } catch (error) {
      next(error)
    }
  };