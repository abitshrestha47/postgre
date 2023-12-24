"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.use(express_1.default.json());
app.use('/', authRoute_1.authRouter);
app.listen(6000, () => {
    console.log('Server running on http://localhost:6000');
});
