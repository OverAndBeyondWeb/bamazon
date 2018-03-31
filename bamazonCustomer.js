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
    connection.query(
      'SELECT * FROM products WHERE item_id = ' + answers.product_id,
      function(err, data) {
        var product = data[0];

        if (answers.quantity > product.stock_quantity) {
          console.log('Insufficient Quantity');
          userProductRequest();
        } else {
          var newQuantity = product.stock_quantity - answers.quantity;
          connection.query(
            'UPDATE products SET stock_quantity=' + newQuantity + ' WHERE item_id = ' + answers.product_id
          );
          console.log('Here you go!');
          connection.end();
        }
      }
    );
  });
}