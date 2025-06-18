"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
const crypto_1 = __importDefault(require("crypto"));
//Dealing with data base operations
class AuthRepository {
    async RegisterUser(newUser) {
        try {
            const user = await models_1.User.create({
                ...newUser
            });
            const token = sendToken(user);
            return { user, token };
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async LoginUser(loginData) {
        const { email, password } = loginData;
        try {
            const user = await models_1.User.findOne({ email }).select("+password");
            if (!user) {
                throw new utils_1.ErrorResponse("Invalid credentials (User not found)", 401);
            }
            else {
                const isMatch = await user.matchPasswords(password);
                if (!isMatch) {
                    throw new utils_1.ErrorResponse("Password does not match", 401);
                }
                else {
                    const token = sendToken(user);
                    return token;
                }
            }
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async ForgotPassword(email) {
        try {
            const user = await models_1.User.findOne({ email });
            if (!user) {
                throw new utils_1.ErrorResponse("User not found", 400);
            }
            const resetToken = user.getResetPasswordToken();
            const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
            console.log(resetUrl);
            try {
                (0, utils_1.sendMail)({
                    to: email,
                    subject: "Password Reset Request",
                    receiver: user.firstName,
                    resetUrl: resetUrl
                });
                return "Email Sent Successfully";
            }
            catch (error) {
                user.resetPasswordToken = "";
                await user.save();
                throw new utils_1.ErrorResponse("Email could not be send", 500);
            }
        }
        catch (error) {
            throw new utils_1.ErrorResponse(error.message, 400);
        }
    }
    async ResetPassword(password, resetToken) {
        try {
            const resetPasswordToken = crypto_1.default.createHash("sha256").update(resetToken).digest('hex');
            const user = await models_1.User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            });
            if (!user) {
                throw new utils_1.ErrorResponse("Invalid Reset Token", 400);
            }
            user.password = password;
            user.resetPasswordToken = "";
            await user.save();
            return "Password successfully updated";
        }
        catch (error) {
        }
    }
}
const sendToken = (user) => {
    const token = user.getSignedToken();
    return token;
};
exports.default = AuthRepository;
