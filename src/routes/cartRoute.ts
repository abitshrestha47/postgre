import express from 'express';
import { createCarts, deleteCartController, getCartsController } from '../controllers/cartController';

export const cartRouter=express.Router();

cartRouter.post('/carts',createCarts);
cartRouter.get('/carts/:userId',getCartsController);
cartRouter.delete('/carts/user/:cartId',deleteCartController);