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
exports.loginController = exports.signupController = void 0;
const db_1 = __importDefault(require("../config/db"));
const authUtils_1 = require("../utils/authUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'secret_key';
const signupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required!' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Email is required!' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password is required!' });
    }
    try {
        //check email already taken
        const emailExists = yield db_1.default.query("SELECT * FROM users WHERE email=$1", [email]);
        if (emailExists.rows.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User Already Exists!',
            });
        }
        const hashedPassword = yield (0, authUtils_1.hashPassword)(password);
        //add new user 
        const user = yield db_1.default.query("INSERT INTO users(username,email,password) VALUES($1,$2,$3)", [username, email, hashedPassword]);
        res.json({
            success: true,
            message: 'User added successfully!',
            user: user.rows[0],
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.signupController = signupController;
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email or Password is invalid!' });
    }
    try {
        //check email validity
        const result = yield db_1.default.query("SELECT * FROM users WHERE email=$1", [email]);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Email not found!'
            });
        }
        //check password
        const user = result.rows[0];
        const passwordMatch = yield (0, authUtils_1.compareHash)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                error: 'Password is not matched!',
            });
        }
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: '1hr',
        });
        res.json({
            success: true,
            message: 'Login successful!',
            user: {
                userId: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginController = loginController;
