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
    if (err) throw err;
    console.log("up and running");
    // retrieveProducts();
    retrieveProducts();
    connection.end();
    
});

function retrieveProducts() {
    console.log("Selecting all available products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
              for (var i = 0; i < res.length; i++) {
            console.log(
              "item_id: " + res[i].item_id + " || product_name: " + res[i].product_name + res[i].price                               
            );
            console.log("------------------------------------------------");
          }
        });
        purchaseProduct() 
    }

function purchaseProduct() {

    connection.query("SELECT product_name FROM products", function(err, data){
        if (err) throw err;

    inquirer
        .prompt([{
            name: "select",
            type: "list",
            message: "what product would you like to buy?",
            choices: function() {
                let choiceArray = [];
                for (let i = 0; i < data.length; i++) {
                    choiceArray.push(data[i].product_name)
                }
                return choiceArray;
            }
        },
        ]).then(function(answer){
        inquirer
            .prompt([{
                name: "quantity",
                type: "input",
                message: "Please input the amount you'd like to purchase of " + answer.select 
                + ": "
                //how do I use the 
            }]).then(function(anotherOne){
                console.log("things are happening");
            })
        });
    });
}