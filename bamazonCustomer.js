require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.SQL_PW,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log(err)
    };
    console.log("up and running");
    // retrieveProducts();
    retrieveProducts();
});

let masterArray = [];

function retrieveProducts() {
    console.log("Selecting all available products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err)
        };

        for (var i = 0; i < res.length; i++) {
            masterArray.push(res[i]);
            console.log(
                "id: " + res[i].item_id + " || product name: " + res[i].product_name + " || price: $" + res[i].price
            );
            console.log("------------------------------------------------");
        }
    });
    purchaseProduct();
}

function purchaseProduct() {
    connection.query("SELECT product_name, stock_quantity, price FROM products", function (err, data) {
        if (err) {
            console.log(err);
        }
        let choiceArray = [];
        let choices = function () {
            for (let i = 0; i < data.length; i++) {
                choiceArray.push(data[i].product_name)
            }
            return choiceArray;
        }
        inquirer
            .prompt([{
                    name: "select",
                    type: "list",
                    message: "what product would you like to buy?",
                    /*I thought about prompting for the ID that the customer wanted to buy, 
                    but that felt unnatural from a customer perspective 
                    so I asked for the name of the product instead */
                    choices: choices()
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Please input the amount you'd like to purchase: ",
                    validate: function (quantity) {
                        if (isNaN(quantity) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function (data) {
                for (i = 0; i < masterArray.length; i++) {
                    if (data.select === masterArray[i].product_name) {
                        if (parseInt(data.quantity) <= masterArray[i].stock_quantity) {
                            console.log("please wait a moment");
                            let selectedItem = data.select;
                            let selectedQuantity = data.quantity;
                            let updatedQuantity = masterArray[i].stock_quantity - (parseInt(data.quantity));
                            let salesTotal = selectedQuantity * masterArray[i].price;
                            updateDatabase(selectedItem, updatedQuantity);
                            console.log("Thank you for your purchase! Your total is: $" + salesTotal);
                        } else {
                            console.log("I'm sorry, we don't have that many in stock")
                        }
                    }
                }
            })
    });
}

function updateDatabase(selectedItem, updatedQuantity) {
    connection.query(
        "UPDATE products SET ? where ?", 
    [{
        stock_quantity: updatedQuantity
    },
    {
        product_name : selectedItem
    }
], function (err, respose) {
        if (err) console.log(err)
    })
    connection.end();
}