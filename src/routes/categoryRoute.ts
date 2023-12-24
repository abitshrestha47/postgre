import express from 'express';
import { createCategoryController, deleteCategoryController, getAllCategoryController, updateCategoryController } from '../controllers/categoryController';

export const categoryRouter=express.Router();

categoryRouter.post('/categories',createCategoryController);
categoryRouter.get('/categories',getAllCategoryController);
categoryRouter.delete('/categories/:id',deleteCategoryController);
categoryRouter.put('/categories/:id',updateCategoryController);

