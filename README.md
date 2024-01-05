# Overview
An ecommerce api that uses graphql, mongoose and express as server to integrate with a SPA client
Graphql and apollo/server is mainly used to to manage the server all the queries and mutations are modularized into a different folder
the server.ts file is the entry/root to the application
# Features
## Auth
It uses jsonwebtoken to create tokens for users that login into the application and saves the token in the database so that the user can login subsequently until it expires
## Cart
A user can add a product to cart, delete or update product in the cart. He can do so only if he/she is authenticated
## Order
A user can create and order and adds it to the orderItem
## Payment
After an order is made he/she can proceed to make payment

# Endpoints
## REST API


| ENDPOINT  | HTTP METHOD | USEAGE | RETURNS
| ------------- | ------------- | ------------- | ------------- |  
| /api/v1/auth/register  | post  | accept email, name, password,address and phone number of the user | userId
| /api/v1/auth/login | post | accept email and password | the JWT token
| /api/v1/products/create | post | accept name ,description , image,price and quantity for a product | product response

# GraphQL The Schema
1. Mutations

| Functions | Useage |
| ------------- | ------------- | 
| add product to cart | addToCart(product: Float!): Cart_item! |
| delete from cart | deleteFromCart(prodId: Float!): Boolean! |
| place order using cash on delivery option | addOrder(address: String = "", cart: Float!, payType: String!, phoneNumber: String = ""): Order! |
| place order using bank card | addOrderUsingCard(address: String = "", cardInfo: CardInput!, cart: Float!, phoneNumber: String = ""): Order! |


# How To Use
git clone https://github.com/samcesa45/dukesell_backend.git to clone the project to your local machine
npm install to install all dependencies
npm run dev to run the project locally
