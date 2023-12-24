"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
exports.categoryRouter = express_1.default.Router();
exports.categoryRouter.post('/categories', categoryController_1.createCategoryController);
exports.categoryRouter.get('/categories', categoryController_1.getAllCategoryController);
exports.categoryRouter.delete('/categories/:id', categoryController_1.deleteCategoryController);
exports.categoryRouter.put('/categories/:id', categoryController_1.updateCategoryController);
