import express from 'express'
const router = express.Router()
import { register, login, forgotPassword, resetPassword } from '../controllers/auth.controller.'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword/:resetToken').put(resetPassword)

module.exports = router