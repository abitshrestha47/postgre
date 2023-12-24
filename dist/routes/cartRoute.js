"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cartController_1 = require("../controllers/cartController");
exports.cartRouter = express_1.default.Router();
exports.cartRouter.post('/carts', cartController_1.createCarts);
exports.cartRouter.get('/carts/:userId', cartController_1.getCartsController);
exports.cartRouter.delete('/carts/user/:cartId', cartController_1.deleteCartController);
