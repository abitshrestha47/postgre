import { Request,Response,NextFunction } from "express"
import pool from "../config/db";

export const createCarts=async(req:Request,res:Response,next:NextFunction)=>{
    const {userId,productId}=req.body;
    try {
        const result=await pool.query('SELECT * FROM carts WHERE user_id=$1 AND product_id=$2',[userId,productId]);
        if(result.rowCount===1){
            return res.status(409).json({
                success:false,
                message:'Product is already added.Goto Carts page.',
            });
        }

        const insertCartStatement=await pool.query('INSERT INTO carts(user_id,product_id) VALUES ($1,$2) RETURNING *',[userId,productId]);
        const cart=insertCartStatement.rows[0];
        res.status(200).json({
            success:true,
            message:'Cart added successfully!',
            cart:cart,
        });
    } catch (error) {
        console.log(error);
    }
}

export const getCartsController=async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.params;
    try {
        const selectCartStatement=await pool.query('SELECT * FROM carts WHERE user_id=$1',[userId]);
        const carts=selectCartStatement.rows;
        res.status(200).json({
            success:true,
            message:"All carts list",
            carts,
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCartController=async(req:Request,res:Response,next:NextFunction)=>{
    const cartId=req.params.cartId;
    try {
        await pool.query('DELETE FROM carts WHERE id=$1',[cartId]);
        res.status(200).json({
            success:true,
            message:'Cart Deleted successfully!',
        });
    } catch (error) {
        console.log(error);
    }
}