"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const crypto_1 = __importDefault(require("crypto"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
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
    coursesCreated: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }],
    coursesEnrolled: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }],
    coursesCompleted: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Course' }],
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, { timestamps: true });
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
UserSchema.methods.matchPasswords = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
UserSchema.methods.getSignedToken = function () {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    if (!process.env.JWT_EXPIRE) {
        throw new Error('JWT_EXPIRE is not defined in the environment variables');
    }
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto_1.default.createHash("sha256").update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    this.save();
    return resetToken;
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
