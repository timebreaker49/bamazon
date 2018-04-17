USE `bamazon`;

CREATE TABLE products (
    `item_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255),
    `department_name` VARCHAR(255),
    `price` DECIMAL (6,4), 
    `stock_quantity` INTEGER, 
    PRIMARY KEY(item_id)
);

INSERt INTO products (product_name, department_name, price, stock_quantity)
VALUES ()