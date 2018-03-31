# bamazon

Bamazon is a command line app for requesting items from a mysql database.

#### Instructions

run the **bamazonCustomer.js** file in the terminal using node

`node bamazonCustomer.js`

the items in the database will be shown in the console and the user will be prompted for a product id, the a requested quantity

If the requested quantity is more than what is in the database a message will be shown and the user will be prompted all over again

If the requested quantity is less than what is in the database the transaction will be successful and the connection to the database will close
