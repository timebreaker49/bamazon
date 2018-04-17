DROP DATABASE IF EXISTS `bamazon`;

CREATE DATABASE `bamazon`;

USE `bamazon`;

CREATE TABLE products (
    `item_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(255),
    `department_name` VARCHAR(255),
    `price` DECIMAL (6,4), 
    `stock_quantity` INTEGER, 
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Beats Solo3", "Headphones", 299.95, 15000),
("SONY XBR55X900E 55-Inch 4K Ultra HD", "TV & Video", 998.00, 4000),
('LG 27UK650-W 27" 4K UHD IPS Monitor', "Monitors", 499, 590),
("God of War", "Video Games", 59.99, 70000),
("Nintendo Switch", "Video Games", 299.99, 9600),
("Zelda: Breath of the Wild", "Video Games", 59.99, 2500),
("Sonos One", "Bluetooth & Wireless Speakers", 199.99, 860),
("Sony a7 Full-Frame Mirrorless Camera", "Camera & Photo", 1998, 1250),
("Canon EF 50mm f/1.8 STM Lens", "Camera & Photo", 125, 6900),
("Fitbit Blaze Smart Fitness Watch", "Wearable Technology", 159.95, 18000);