# checkout-state-machine
A simple nodejs checkout system using NodeJS

# Running instructions
Install nodejs using https://nodejs.org.

Clone this repo and run node checkout.js.

Follow the instructions the program asks for.

The program runs in interactive mode.

# Logic explanation
The idea is to use json objects for keeping track of
different product totals by key value pair, marked by the
variable totalMap.

Whenever user enters a product code (or it's scanned in other
words), its validated and switch case switches over different
logics for different products based on the product rules specified.
At the end, cost of all the products is consolidated, summed and total
final cost is printed out on the screen.
