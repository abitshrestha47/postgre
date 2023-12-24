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
exports.isAdmin = exports.requiresSignin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const SECRET_KEY = 'secret_key';
const requiresSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
            return res.status(401).json({ error: 'Unauthorized:Missing Authorization Header' });
        }
        const decoded = jsonwebtoken_1.default.verify((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization, SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.requiresSignin = requiresSignin;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userSelectStatement = yield db_1.default.query('SELECT * FROM users WHERE id=$1', [req.user.id]);
        const user = userSelectStatement.rows[0];
        if ((user === null || user === void 0 ? void 0 : user.role) !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized access',
            });
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.isAdmin = isAdmin;
