import express,{Router,Request,Response} from 'express';
import { loginController, signupController } from '../controllers/authController';
import { isAdmin, requiresSignin } from '../middleware/authMiddleware';

export const authRouter:Router=express.Router();

authRouter.post('/signup',signupController);
authRouter.post('/login',loginController);

authRouter.get('/admin-auth',requiresSignin,isAdmin,(req:Request,res:Response)=>{
    res.send({ok:'true'});
});

authRouter.get('/user-auth',requiresSignin,(req:Request,res:Response)=>{
    res.send({ok:'true'});
});


