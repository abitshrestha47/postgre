import { Request,Response,NextFunction } from "express"
import pool from "../config/db";
import { compareHash, hashPassword } from "../utils/authUtils";
import jwt from 'jsonwebtoken';

const SECRET_KEY='secret_key'

export const signupController=async(req:Request,res:Response,next:NextFunction)=>{
    const {username,email,password}=req.body;
    if(!username){
        return res.status(400).json({error:'Username is required!'});
    }
    if(!email){
        return res.status(400).json({error:'Email is required!'});
    }
    if(!password){
        return res.status(400).json({error:'Password is required!'});
    }
    try {
        //check email already taken
        const emailExists=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if(emailExists.rows.length>0){
            return res.status(409).json({
                success:false,
                message:'User Already Exists!',
            });
        }
        const hashedPassword=await hashPassword(password);
        //add new user 
        const user=await pool.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)",[username,email,hashedPassword]);
        res.json({
            success:true,
            message:'User added successfully!',
            user:user.rows[0],
        });
    } catch (error) {
        console.log(error);
    }
}

export const loginController=async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({error:'Email or Password is invalid!'});
    }
    try {
        //check email validity
        const result=await pool.query("SELECT * FROM users WHERE email=$1",[email]);
        if(result.rows.length===0){
            return res.status(404).json({
                success:false,
                error:'Email not found!'
            });
        }
        //check password
        const user=result.rows[0];
        const passwordMatch=await compareHash(password,user.password);
        if(!passwordMatch){
            return res.status(401).json({
                success:false,
                error:'Password is not matched!',
            });
        }
        const token=await jwt.sign({id:user.id},SECRET_KEY,{
            expiresIn:'1hr',
        });
        res.json({
            success:true,
            message:'Login successful!',
            user:{
                userId:user.id,
                username:user.username,
                email:user.email,
            },
            token,
        });
    } catch (error) {
        console.log(error);
    }
}