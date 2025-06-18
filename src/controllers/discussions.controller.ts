import { DiscussionService } from "../services";
import { DiscussionInterface, DiscussionUpdateInterface } from "../interfaces";
import {ErrorResponse} from "../utils";
import { Request, Response, NextFunction } from "express";
import { validateDiscussion, validateUpdateDiscussion } from "../validations";

interface CustomRequest extends Request {
  body: DiscussionInterface;
}

interface CustomUpdateRequest extends Request {
  body: DiscussionUpdateInterface;
  params: {
    discussionId: string
  }
}


const service = new DiscussionService()

export const getDiscussions = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
      const { data } = await service.GetDiscussions();
      return res.json(data);
  } catch (error) {
      next(error)
  }
}

export const addDiscussion = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
      validateDiscussion(req.body)
      const { data } = await service.AddDiscussion(req.body);
      return res.json(data);
  } catch (error) {
      next(error)
  }
}

export const updateDiscussion = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  try {
      validateUpdateDiscussion(req.body)
      const { data } = await service.UpdateDiscussion(req.body);
      return res.json(data);
  } catch (error) {
      next(error)
  }
}

export const deleteDiscussion = async (req: CustomUpdateRequest, res: Response, next: NextFunction) => {
  const { discussionId } = req.params;

  try {
    if(!discussionId) {
      throw new ErrorResponse("discussionId is required", 400)
    }
    const { data } = await service.DeleteDiscussion(discussionId);
  return res.json(data);
  } catch (error) {
    next(error)
  }
};