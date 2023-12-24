"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoute_1 = require("./routes/authRoute");
const categoryRoute_1 = require("./routes/categoryRoute");
const productRoute_1 = require("./routes/productRoute");
const cartRoute_1 = require("./routes/cartRoute");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config.js");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.get('/', (req, res, next) => {
    res.send('Hello');
});
app.use(express_1.default.static('public'));
app.use('/images', express_1.default.static('public/assets/images'));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', authRoute_1.authRouter);
app.use('/', categoryRoute_1.categoryRouter);
app.use('/', productRoute_1.productRouter);
app.use('/', cartRoute_1.cartRouter);
app.listen(8000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
