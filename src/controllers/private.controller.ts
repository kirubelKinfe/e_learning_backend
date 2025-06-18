import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { UserService } from "../services";
import { ErrorResponse } from "../utils";

interface CustomRequest extends Request {
    body: any;
    user?: any
}

const service = new UserService()

export const getPrivateData = async (req: CustomRequest, res: Response, next: NextFunction) => {  
    
    try {
      const isId = mongoose.Types.ObjectId.isValid(req.user._id)
      if(isId) {
        const { data } = await service.GetUserById(req.user._id);
        return res.json(data);
      } else {
        throw new ErrorResponse("Not a valid userId", 400)
      }
      
    } catch (error) {
      next(error)
    }
}