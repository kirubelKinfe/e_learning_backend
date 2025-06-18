import { User } from '../models';
import { UserLogin, UserRegister } from '../interfaces';
import { ErrorResponse, sendMail } from '../utils';
import crypto from 'crypto';

//Dealing with data base operations
class AuthRepository {

    async RegisterUser(newUser: UserRegister): Promise<any>  {
        try{
            const user = await User.create({
                ...newUser
            })
            const token = sendToken(user)
            return {user, token}
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }
 
 
    async LoginUser(loginData: UserLogin): Promise<any> {
        const { email, password } = loginData

        try{
            const user = await User.findOne({ email }).select("+password");
            if(!user)  {
                throw new ErrorResponse("Invalid credentials (User not found)", 401)
            }
            else {
                const isMatch = await user.matchPasswords(password)
            
                if(!isMatch) {
                    throw new ErrorResponse("Password does not match", 401)
                } else {
                    const token = sendToken(user)
                    return token
                }
            }
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    }

    async ForgotPassword(email: string): Promise<any> {
        try{
            const user = await User.findOne({ email })
            if(!user) {
                throw new ErrorResponse("User not found", 400)
            }
            
            const resetToken = user.getResetPasswordToken();

            const resetUrl = `http://localhost:5173/reset-password/${resetToken}`
            console.log(resetUrl)
           
            try {
                sendMail({
                    to: email,
                    subject: "Password Reset Request",
                    receiver: user.firstName,
                    resetUrl: resetUrl
                })
                return "Email Sent Successfully"
            } catch (error) {
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save()
                throw new ErrorResponse("Email could not be send", 500)
            }
        }catch(error){
            throw new ErrorResponse(error.message, 400)
        }
    } 

    async ResetPassword(password: string, resetToken: string): Promise<any> {
        try {
            const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now()}
            })
    
            if(!user) {
                throw new ErrorResponse("Invalid Reset Token", 400)
            }

            user.password = password
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
    
            await user.save()

            return "Password successfully updated"
        } catch(error) {

        }
    }
}


const sendToken = (user: any) => {
    const token = user.getSignedToken()
    return token
}

export default AuthRepository;