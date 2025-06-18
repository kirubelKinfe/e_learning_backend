"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_controller_1 = require("../controllers/auth.controller.");
router.route('/register').post(auth_controller_1.register);
router.route('/login').post(auth_controller_1.login);
router.route('/forgotpassword').post(auth_controller_1.forgotPassword);
router.route('/resetpassword/:resetToken').put(auth_controller_1.resetPassword);
module.exports = router;
