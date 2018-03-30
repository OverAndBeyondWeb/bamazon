var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'Un*5pint',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  showProducts();
});

function showProducts() {
  connection.query(
    'SELECT * FROM products',
    function(err, data) {
      console.log(data);
      userProductRequest();
    }
  );
}

function userProductRequest() {
  inquirer.prompt([
    {
      message: 'Please input the id of the product you wish to purchase',
      name: 'product_id'
    },
    {
      message: 'Please input the quantity that you wish to purchase',
      name: 'quantity'
    }
  ]).then(function(answers) {
    console.log(answers);
    connection.query(
      'SELECT * FROM products WHERE item_id = ' + answers.product_id,
      function(err, data) {
        var product = data[0];
        console.log(product.stock_quantity);
        // if (answers.quantity > product.stock_quantity) {
        //   console.log('Insufficient Quantity');
        // } else {
        //   console.log('Here you go!');
        // }
      }
    );
  });
}