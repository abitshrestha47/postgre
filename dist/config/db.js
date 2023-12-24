"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const poolConfig = ({
    user: 'postgres',
    password: process.env.password,
    host: 'localhost',
    port: 5432,
    database: process.env.database
});
const pool = new pg_1.Pool(poolConfig);
exports.default = pool;
