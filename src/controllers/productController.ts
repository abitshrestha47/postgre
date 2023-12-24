import { Request,Response,NextFunction } from "express";
import slugify from "slugify";
import pool from "../config/db";

export const createProductController=async(req:Request,res:Response,next:NextFunction)=>{
    const {productName,productDescription,productQuantity,categoryId,productPrice,productShipping}=req.body;
    const productPhoto=req.file?.filename;
    try {
        const slug=slugify(productName);
        const insertProductStatement=await pool.query("INSERT INTO products(product_name,product_description,product_quantity,product_price,category_id,product_shipping,product_photo,product_slug_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[productName,productDescription,productQuantity,productPrice,categoryId,productShipping,productPhoto,slug]);
        const product=insertProductStatement.rows[0];
        res.status(201).json({
            success:true,
            message:'Category created successfully.',
            product,
        });  
      } catch (error) {
        console.log(error);
    }
}

export const getAllProductController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
     //get all products
     const productsFetch=await pool.query('SELECT * FROM products');
     if(productsFetch.rows.length===0){
         res.status(200).json({
             message:'Products is empty',
         });
     }else{
         const products=productsFetch.rows;
         res.status(200).json({
             success:true,
             message:'All products lists',
             products,
         });
     } 
    } catch (error) {
        console.log(error);
    }
}

export const getSingleProductController=async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id;
    try {
        const productsFetch=await pool.query('SELECT * FROM products WHERE id=$1',[id]);
        if(productsFetch.rows.length===0){
            res.status(404).json({
                message:'Products not found!',
            });
        }else{
            const products=productsFetch.rows[0];
            res.status(200).json({
                success:true,
                message:'All products lists',
                products,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const getSingleProductControllerBySlug=async(req:Request,res:Response,next:NextFunction)=>{
    const slug=req.params.slug;
    try {
        const productsFetch=await pool.query('SELECT * FROM products WHERE product_slug_name=$1',[slug]);
        if(productsFetch.rows.length===0){
            res.status(404).json({
                message:'Products not found!',
            });
        }else{
            const products=productsFetch.rows[0];
            res.status(200).json({
                success:true,
                message:'All products lists',
                products,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductController=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    try {
        if(id){
            const result=await pool.query('DELETE FROM products WHERE id=$1',[id]);
            if(result.rowCount===1){
                res.status(200).json({
                    success:true,
                    message:'Product deleted successfully',
                });
            }else{
                res.status(400).json({
                    success:false,
                    error:'Product not found!',
                });
            }
        }else{
            res.status(400).json({
                success:false,
                error:'Invalid Product ID is provided!',
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProductController=async(req:Request,res:Response,next:NextFunction)=>{
    const {productName,productDescription,productPrice,productQuantity,productCategory}=req.body;
    const id=req.params.id;
    try {
        const updateProductStatement=await pool.query('UPDATE products SET product_name,product_description,product_price,product_quantity,product_category',[productName,productDescription,productPrice,productQuantity,productCategory])
    } catch (error) {
        console.log(error);
    }
}