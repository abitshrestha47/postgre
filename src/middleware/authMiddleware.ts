import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const SECRET_KEY='secret_key'

//creating custom request interface to include user in request
interface AuthenticatedRequest extends Request{
    user?:any;
}
export const requiresSignin=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
        if(!req?.headers?.authorization){
            return res.status(401).json({error:'Unauthorized:Missing Authorization Header'});
        }
        const decoded=jwt.verify(req?.headers?.authorization,SECRET_KEY);
        req.user=decoded;
        next();
    } catch (error) {
        console.log(error); 
    }
}

export const isAdmin=async(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
        const userSelectStatement=await pool.query('SELECT * FROM users WHERE id=$1',[req.user.id]);
        const user=userSelectStatement.rows[0];
        if(user?.role!==1){
            return res.status(401).send({
                success:false,
                message:'Unauthorized access',
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}