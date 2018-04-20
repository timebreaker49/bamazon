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

    connection.query("SELECT product_name, stock_quantity FROM products", function(err, data){
        if (err) {
            console.log(err);
        }
        let choiceArray = [];
        let choices = function() {for (let i = 0; i < data.length; i++) {
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
        }
        ,
        ]).then(function(answer){
        inquirer
            .prompt([{
                name: "quantity",
                type: "input",
                message: "Please input the amount you'd like to purchase of " + answer.select 
                + ": ",
                validate: function(value) {
                    if (isNaN(value) === false) { 
                        return true;
                    }
                    return false;
                    }
                }
                //how do I use the 
            ]).then(function(value){
                console.log(masterArray);
                for (i = 0; i < masterArray.length; i++) {
                    console.log(masterArray[i].product_name);
                    // if (value.quantity < )
                }
                // console.log(stock_quantity);
                console.log(answer.select);
                console.log(value.quantity);
                // let desiredQuant = value.quantity;
                // if (desiredQuant < stock_quantity) {
                //     console.log("i")
                // }
                // });
            })
        });
    });
}