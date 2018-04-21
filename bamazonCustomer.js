var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        console.log(err)
    };
    console.log("up and running");
    // retrieveProducts();
    retrieveProducts();
    connection.end();

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
                "item_id: " + res[i].item_id + " || product_name: " + res[i].product_name + res[i].price
            );
            console.log("------------------------------------------------");
        }
    });
    purchaseProduct();
}

function purchaseProduct() {

    connection.query("SELECT product_name, stock_quantity FROM products", function (err, data) {
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
                    //how do I use the 
                ]).then(function (data) {
                        for (i = 0; i < masterArray.length; i++) {
                            if (data.select === masterArray[i].product_name) {
                                if (parseInt(data.quantity) <= masterArray[i].stock_quantity) {
                                    console.log("please wait a moment");
                                    console.log(data.quantity);
                                    console.log(masterArray[i].stock_quantity)
                                } else {
                                    console.log("I'm sorry, we don't have that many in stock")
                                }
                            }
                        }
                
                    // console.log(stock_quantity);

                    // console.log(value.quantity);
                    // let desiredQuant = value.quantity;
                    // if (desiredQuant < stock_quantity) {
                    //     console.log("i")
                    // }
                    // });
                })
    });
}