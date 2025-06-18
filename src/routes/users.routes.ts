import express from 'express'
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users.controller'
const router = express.Router()

router.route('/')
    .get( getUsers)
    .put( updateUser)

router.route('/:userId')    
    .delete( deleteUser)
    .get(getUserById)
    
module.exports = router