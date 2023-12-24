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
exports.updateProductController = exports.deleteProductController = exports.getSingleProductControllerBySlug = exports.getSingleProductController = exports.getAllProductController = exports.createProductController = void 0;
const slugify_1 = __importDefault(require("slugify"));
const db_1 = __importDefault(require("../config/db"));
const createProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { productName, productDescription, productQuantity, categoryId, productPrice, productShipping } = req.body;
    const productPhoto = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const slug = (0, slugify_1.default)(productName);
        const insertProductStatement = yield db_1.default.query("INSERT INTO products(product_name,product_description,product_quantity,product_price,category_id,product_shipping,product_photo,product_slug_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [productName, productDescription, productQuantity, productPrice, categoryId, productShipping, productPhoto, slug]);
        const product = insertProductStatement.rows[0];
        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
            product,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createProductController = createProductController;
const getAllProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get all products
        const productsFetch = yield db_1.default.query('SELECT * FROM products');
        if (productsFetch.rows.length === 0) {
            res.status(200).json({
                message: 'Products is empty',
            });
        }
        else {
            const products = productsFetch.rows;
            res.status(200).json({
                success: true,
                message: 'All products lists',
                products,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllProductController = getAllProductController;
const getSingleProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const productsFetch = yield db_1.default.query('SELECT * FROM products WHERE id=$1', [id]);
        if (productsFetch.rows.length === 0) {
            res.status(404).json({
                message: 'Products not found!',
            });
        }
        else {
            const products = productsFetch.rows[0];
            res.status(200).json({
                success: true,
                message: 'All products lists',
                products,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProductController = getSingleProductController;
const getSingleProductControllerBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    try {
        const productsFetch = yield db_1.default.query('SELECT * FROM products WHERE product_slug_name=$1', [slug]);
        if (productsFetch.rows.length === 0) {
            res.status(404).json({
                message: 'Products not found!',
            });
        }
        else {
            const products = productsFetch.rows[0];
            res.status(200).json({
                success: true,
                message: 'All products lists',
                products,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleProductControllerBySlug = getSingleProductControllerBySlug;
const deleteProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id) {
            const result = yield db_1.default.query('DELETE FROM products WHERE id=$1', [id]);
            if (result.rowCount === 1) {
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully',
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    error: 'Product not found!',
                });
            }
        }
        else {
            res.status(400).json({
                success: false,
                error: 'Invalid Product ID is provided!',
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProductController = deleteProductController;
const updateProductController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, productDescription, productPrice, productQuantity, productCategory } = req.body;
    const id = req.params.id;
    try {
        const updateProductStatement = yield db_1.default.query('UPDATE products SET product_name,product_description,product_price,product_quantity,product_category', [productName, productDescription, productPrice, productQuantity, productCategory]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateProductController = updateProductController;
