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
exports.deleteCategoryController = exports.updateCategoryController = exports.getAllCategoryController = exports.createCategoryController = void 0;
const slugify_1 = __importDefault(require("slugify"));
const db_1 = __importDefault(require("../config/db"));
const createCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName) {
        return res.status(400).json({ error: 'Category Name is required!' });
    }
    if (!categoryDescription) {
        return res.status(400).json({ error: 'Category Name is required!' });
    }
    const slug = (0, slugify_1.default)(categoryName);
    try {
        //find if category preexists
        const result = yield db_1.default.query('SELECT * FROM categories WHERE category_slug_name=$1', [slug]);
        if (result.rows.length > 0) {
            return res.status(409).json({
                message: 'Category already exists!',
            });
        }
        const categoryInsert = yield db_1.default.query("INSERT INTO categories(category_name,category_slug_name,category_description) VALUES($1,$2,$3) RETURNING *", [categoryName, slug, categoryDescription]);
        const category = categoryInsert.rows[0];
        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
            category,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createCategoryController = createCategoryController;
const getAllCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get all categories
        const categoriesFetch = yield db_1.default.query('SELECT * FROM categories');
        if (categoriesFetch.rows.length === 0) {
            res.status(200).json({
                message: 'Category is empty',
            });
        }
        else {
            const categories = categoriesFetch.rows;
            res.status(200).json({
                success: true,
                message: 'All Category lists',
                categories,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllCategoryController = getAllCategoryController;
const updateCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName) {
        return res.status(400).json({ error: 'Category Name is required!' });
    }
    if (!categoryDescription) {
        return res.status(400).json({ error: 'Category Name is required!' });
    }
    const slug = (0, slugify_1.default)(categoryName);
    try {
        //find if category preexists
        const result = yield db_1.default.query('UPDATE categories SET category_slug_name=$1,category_name=$2,category_description=$3 WHERE id=$4', [slug, categoryName, categoryDescription, id]);
        res.status(201).json({
            success: true,
            message: 'Category created successfully.',
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (id) {
            const result = yield db_1.default.query('DELETE FROM categories WHERE id=$1', [id]);
            if (result.rowCount === 1) {
                res.status(200).json({
                    success: true,
                    message: 'Category deleted.',
                });
            }
            else {
                res.status(400).json({
                    message: 'Category not found!',
                });
            }
        }
        else {
            res.status(400).json({
                message: 'Invalid cateogry id provided!',
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteCategoryController = deleteCategoryController;
