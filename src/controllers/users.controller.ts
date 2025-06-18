import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils";
import { UserInterface, UserUpdate } from "../interfaces";
import { validateUserUpdate } from "../validations/user.validation";
import { UserService } from "../services";
import mongoose from "mongoose";


interface CustomRequest extends Request {
    body: UserInterface;
}

interface CustomUserUpdateRequest extends Request {
    body: UserUpdate,
    params: {
        userId: string
    }
}

const service = new UserService()

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = await service.GetUsers();
        return res.json(data);
    } catch (error: any) {
        return next(new ErrorResponse(error.message, 400))
    }
}

export const getUserById = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params
    
    try {
      const isId = mongoose.Types.ObjectId.isValid(userId)
      if(isId) {
        const { data } = await service.GetUserById(userId);
        return res.json(data);
      } else {
        throw new ErrorResponse("Not a valid Id", 400)
      }
      
    } catch (error) {
      next(error)
    }  
  }

export const updateUser = async (req: CustomUserUpdateRequest, res: Response, next: NextFunction) => {
    try {
        await validateUserUpdate(req.body)
        const { data } = await service.UpdateUser(req.body);
        return res.json(data);
    } catch(error: any){
        return next(new ErrorResponse(error.message, 400))
    }
}

export const deleteUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { userId } = req.params

    try {
        if(!userId) {
            throw new ErrorResponse("userId is required", 400)
        }
        const { data } = await service.DeleteUser(userId);
        return res.json(data);
        
    } catch(error: any){
        return next(new ErrorResponse(error.message, 400))
    }
}


