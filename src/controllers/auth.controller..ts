
import {ErrorResponse} from '../utils';
import { Request, Response, NextFunction } from "express";
import { validateUserRegister, validateUserLogin, validateForgotPassword, validateResetToken } from '../validations';
import { UserLogin, UserRegister } from '../interfaces';
import { UserResetToken } from '../interfaces';
import { AuthService } from '../services';

interface CustomRegisterRequest extends Request {
    body: UserRegister
}

interface CustomLoginRequest extends Request {
    body: UserLogin
}

interface CustomForgotPasswordRequest extends Request {
    body: {
        email: string
    }
}

interface CustomResetTokenRequest {
    body: {
        password: string
    }
    params: UserResetToken
}


const service = new AuthService()

export const register = async (req: CustomRegisterRequest, res: Response, next: NextFunction)  => {
    const newUser = req.body
    
    try {
        await validateUserRegister(newUser)
        const { data } = await service.Register(newUser);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const login = async (req: CustomLoginRequest, res: Response, next: NextFunction)  => {
    try {
        await validateUserLogin(req.body)
        const { data } = await service.Login(req.body);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async (req: CustomForgotPasswordRequest, res: Response, next: NextFunction)  => {
    const { email } = req.body
    
    try {
        await validateForgotPassword(req.body)
        const { data } = await service.ForgotPassword(email);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async (req: CustomResetTokenRequest, res: Response, next: NextFunction)  => {
    const { resetToken } = req.params
    const { password } = req.body

    try {
        await validateResetToken(req.params)
        const { data } = await service.ResetPassword(password, resetToken);
        return res.json(data);
    } catch (error) {
        next(error)
    }
}

