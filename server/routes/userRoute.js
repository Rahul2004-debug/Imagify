import express from 'express';
import {registerUser, loginUser, userCredits, paymentRazorPay, verifyRazorpay} from '../controllers/userController.js';
import   userAuth  from '../middlewares/auth.js'


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth,userCredits);
userRouter.post('/pay-razor',userAuth,paymentRazorPay);
userRouter.post('/verify-payment',verifyRazorpay);

export default userRouter;

//  
// http://localhost:4000/api/user/login
// http://localhost:4000/api/user/credits