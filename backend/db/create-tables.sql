CREATE DATABASE ecommerce;

-- Tabela de Produtos
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categories TEXT[]
);

-- Tabela de Variantes
CREATE TABLE variants (
    variant_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    size VARCHAR(50),
    color VARCHAR(50)
    -- Outros atributos específicos da variante
);

-- Tabela de Usuários
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabela de Pedidos
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(user_id),
    shipping_address VARCHAR(255) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'paid', 'shipped', 'delivered')) NOT NULL
);

-- Tabela de Itens do Carrinho
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL
);