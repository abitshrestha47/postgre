"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/signup', authController_1.signupController);
exports.authRouter.post('/login', authController_1.loginController);
exports.authRouter.get('/admin-auth', authMiddleware_1.requiresSignin, authMiddleware_1.isAdmin, (req, res) => {
    res.send({ ok: 'true' });
});
exports.authRouter.get('/user-auth', authMiddleware_1.requiresSignin, (req, res) => {
    res.send({ ok: 'true' });
});
