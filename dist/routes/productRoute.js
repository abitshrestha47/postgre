"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const multerConfig_1 = require("../utils/multerConfig");
exports.productRouter = express_1.default.Router();
exports.productRouter.post('/products', multerConfig_1.upload.single('productPhoto'), productController_1.createProductController);
exports.productRouter.get('/products/:id', productController_1.getSingleProductController);
exports.productRouter.get('/product/:slug', productController_1.getSingleProductControllerBySlug);
exports.productRouter.get('/products', productController_1.getAllProductController);
exports.productRouter.put('/product/update-product/:id', productController_1.updateProductController);
