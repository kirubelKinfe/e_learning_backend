// @ts-nocheck
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../interfaces'

const UserSchema = new mongoose.Schema<UserInterface>({
    firstName: {
        type: String,
        required: [true, "Please provide a firstName"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide a lastName"]
    },
    profilePic: {
        type: String,
        default: ''
    },
    active: {
        type: String,
        default: 'active'
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false
    },

    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    coursesEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    coursesCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],

    resetPasswordToken: String,
    resetPasswordExpire: Date
    
}, { timestamps: true })


UserSchema.pre("save", async function(next: any) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPasswords = async function(password: string) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function() {
    
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    
    if (!process.env.JWT_EXPIRE) {
      throw new Error('JWT_EXPIRE is not defined in the environment variables');
    }

    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
}

UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)
    this.save()
    return resetToken
}

const User = mongoose.model<UserInterface>("User", UserSchema)
export default User