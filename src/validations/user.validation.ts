import mongoose from 'mongoose';
import { UserForgotPassword, UserLogin, UserRegister, UserResetToken, UserUpdate } from '../interfaces';
import * as yup from 'yup';



export const validateUserRegister = async (
  user: UserRegister,
) => {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        profilePic: yup.string().optional(),
        password: yup.string().required(),
        role: yup.string().optional()
    });

    return await schema.validate(user);
};

export const validateUserLogin = async (
  user: UserLogin,
) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    return await schema.validate(user);
};

export const validateUserUpdate = async (
  user: UserUpdate,
) => {
    const _id = mongoose.Types.ObjectId.isValid(user._id.toString())
    const schema = yup.object().shape({
        firstName: yup.string().optional(),
        lastName: yup.string().optional(),
        profilePic: yup.string().optional(),
        email: yup.string().email().optional(),
        password: yup.string().optional(),
        role: yup.string().optional()
    });

    if(!_id) return
    
    return await schema.validate(user);
};


export const validateForgotPassword = async (
  user: UserForgotPassword,
) => {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
    });

    return await schema.validate(user);
};


export const validateResetToken = async (
  user: UserResetToken,
) => {
    const schema = yup.object().shape({
        resetToken: yup.string().required()
    });

    return await schema.validate(user);
};