import express from 'express';
import { getAllUserDetail, loginUser, signUpUser } from '../controller/user.js';
import authenticateUser from '../middleware/authorizationMiddleware.js';

const router = express.Router()

router.route('/signUp').post(signUpUser)
router.route('/login').post(loginUser)
router.route('/getAllUserDetail').get(authenticateUser,getAllUserDetail)


export const userRouter = router;