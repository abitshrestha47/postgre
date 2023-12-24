import express from 'express';
import { createProductController, getAllProductController, getSingleProductController, getSingleProductControllerBySlug,updateProductController } from '../controllers/productController';
import { upload } from '../utils/multerConfig';

export const productRouter=express.Router();

productRouter.post('/products',upload.single('productPhoto'),createProductController);
productRouter.get('/products/:id',getSingleProductController)
productRouter.get('/product/:slug',getSingleProductControllerBySlug);
productRouter.get('/products',getAllProductController);
productRouter.put('/product/update-product/:id',updateProductController);