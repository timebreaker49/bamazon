var mysql = require("mysql");

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
    retrieveProducts();
});

function retrieveProducts() {
    console.log("Selecting all available products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
              for (var i = 0; i < res.length; i++) {
            console.log(
              "item_id: " +
                res[i].item_id +
                " || product_name: " +
                res[i].product_name +
                " || price: " +
                res[i].price
            );
          }
          connection.end();
        });
    }