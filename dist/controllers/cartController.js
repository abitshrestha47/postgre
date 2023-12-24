"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartController = exports.getCartsController = exports.createCarts = void 0;
const db_1 = __importDefault(require("../config/db"));
const createCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId } = req.body;
    try {
        const result = yield db_1.default.query('SELECT * FROM carts WHERE user_id=$1 AND product_id=$2', [userId, productId]);
        if (result.rowCount === 1) {
            return res.status(409).json({
                success: false,
                message: 'Product is already added.Goto Carts page.',
            });
        }
        const insertCartStatement = yield db_1.default.query('INSERT INTO carts(user_id,product_id) VALUES ($1,$2) RETURNING *', [userId, productId]);
        const cart = insertCartStatement.rows[0];
        res.status(200).json({
            success: true,
            message: 'Cart added successfully!',
            cart: cart,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createCarts = createCarts;
const getCartsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const selectCartStatement = yield db_1.default.query('SELECT * FROM carts WHERE user_id=$1', [userId]);
        const carts = selectCartStatement.rows;
        res.status(200).json({
            success: true,
            message: "All carts list",
            carts,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getCartsController = getCartsController;
const deleteCartController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.cartId;
    try {
        yield db_1.default.query('DELETE FROM carts WHERE id=$1', [cartId]);
        res.status(200).json({
            success: true,
            message: 'Cart Deleted successfully!',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCartController = deleteCartController;
