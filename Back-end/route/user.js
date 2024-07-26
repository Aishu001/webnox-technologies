import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router()

router.route('/signUp').post()
router.route('/login').post()
router.route('/getAllUserDetail').get()


export const userRouter = router;