CREATE DATABASE postgres0;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    email VARCHAR(20),
    password VARCHAR(100),
    role INT DEFAULT 0 CHECK (role IN (0, 1))
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(20),
    category_slug_name VARCHAR(20),
    category_description VARCHAR(50)
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(20) NOT NULL,
    product_slug_name VARCHAR(20) UNIQUE NOT NULL,
    product_description VARCHAR(50),
    product_quantity INTEGER DEFAULT 1,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    product_price INTEGER NOT NULL,
    product_photo VARCHAR(100),
    product_shipping BOOLEAN
);

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);