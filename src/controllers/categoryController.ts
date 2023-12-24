import { Request,Response,NextFunction } from "express";
import slugify from "slugify";
import pool from "../config/db";

interface Category{
    id:number,
    category_name:string,
    category_slug_name:string,
    category_description:string,
}

export const createCategoryController=async(req:Request,res:Response,next:NextFunction)=>{
    const {categoryName,categoryDescription}=req.body;
    if(!categoryName){
        return res.status(400).json({error:'Category Name is required!'});
    }
    if(!categoryDescription){
        return res.status(400).json({error:'Category Name is required!'});
    }
    const slug=slugify(categoryName);
    try {
        //find if category preexists
        const result=await pool.query('SELECT * FROM categories WHERE category_slug_name=$1',[slug]);
        if(result.rows.length>0){
            return res.status(409).json({
                message:'Category already exists!',
            });
        }
        const categoryInsert=await pool.query("INSERT INTO categories(category_name,category_slug_name,category_description) VALUES($1,$2,$3) RETURNING *",[categoryName,slug,categoryDescription]);
        const category:Category=categoryInsert.rows[0];
        res.status(201).json({
            success:true,
            message:'Category created successfully.',
            category,
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllCategoryController=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        //get all categories
        const categoriesFetch=await pool.query('SELECT * FROM categories');
        if(categoriesFetch.rows.length===0){
            res.status(200).json({
                message:'Category is empty',
            });
        }else{
            const categories=categoriesFetch.rows;
            res.status(200).json({
                success:true,
                message:'All Category lists',
                categories,
            });
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateCategoryController=async(req:Request, res:Response,next:NextFunction)=>{   
    const id=req.params.id;
    const {categoryName,categoryDescription}=req.body;
    if(!categoryName){
        return res.status(400).json({error:'Category Name is required!'});
    }
    if(!categoryDescription){
        return res.status(400).json({error:'Category Name is required!'});
    }
    const slug=slugify(categoryName);
    try {
        //find if category preexists
        const result=await pool.query('UPDATE categories SET category_slug_name=$1,category_name=$2,category_description=$3 WHERE id=$4',[slug,categoryName,categoryDescription,id]);
        res.status(201).json({
            success:true,
            message:'Category created successfully.',
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategoryController=async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    try {
        if(id){
            const result=await pool.query('DELETE FROM categories WHERE id=$1',[id]);
            if(result.rowCount===1){
                res.status(200).json({
                    success:true,
                    message:'Category deleted.',
                });
            }else{
                res.status(400).json({
                    message:'Category not found!',
                });
            }
        }else{
            res.status(400).json({
                message:'Invalid cateogry id provided!',
            });
        }
    } catch (error) {
        console.log(error);
    }
}