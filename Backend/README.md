# Shopping Cart API
## Overview
This API supports managing a shopping cart and products, allowing users to add, update, browse, and delete products. Users can also apply discount codes and proceed to checkout.

## Endpoints
### Authentication
- POST /api/auth/signin: User login to receive a JWT token.
### Product Management
- POST /api/products: Create a product (Authenticated users).
- GET /api/products: Fetch all products (Public).
GET /api/products/
- : Get a product by ID (Public).
- PUT /api/products/
: Update a product (Creator only).
- DELETE /api/products/
: Delete a product (Creator only).
### Cart Management
- POST /api/cart: Add product to cart (Authenticated users).
- DELETE /api/cart: Remove product from cart.
- POST /api/cart/apply-discount: Apply discount code to cart.
- POST /api/cart/checkout: Checkout and clear the cart, reducing product stock.
### Cart Validation
- Automatically checks product availability and stock during cart operations, removing unavailable items.
## How to Use
1. Clone the project.
2. Set up .env file for configuration.
3. Start the server and use Postman or any API testing tool to interact with the endpoints.