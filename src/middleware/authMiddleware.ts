import jwt from 'jsonwebtoken';
import { User } from '../models';
import ErrorResponse from '../utils/error-response';
import { Request, Response, NextFunction } from 'express';
interface CustomRequest extends Request {
    body: any;
    user?: any;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;

    if(req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1]
    }
    
    if(!token) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }

    try {
        
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in the environment variables');
        }
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded)
        const user = await User.findById(decoded.id)
        
        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404))
        } else {
            req.user = user;
            next()
        }

        
    } catch (error) {
        console.log(error)
        return next(new ErrorResponse("Not authorized to access this route", 401))
    }
}