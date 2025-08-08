#  Shoppy Globe Backend

A Node.js + Express backend for an e-commerce platform built with MongoDB, Mongoose, and JWT authentication.

##  Features

- Product Management-Add,Remove,Update,GetAllProducts,SingleProduct.
- Cart Management- AddToCart,RemoveProductFromCart,UpdateQuantity,GetCartItems.
- User registration and login ,get profile and change password,
- Secure password hashing (bcrypt)
- JWT-based authentication
- Mongoose schema validation
- Modular controller and model structure

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**

---

##  Project Structure
│
├── Controller/ # All route handler logic
├── Model/ # Mongoose schemas (User, Product, Cart)
├── Routes/ # API route definitions
├── Middleware/ # JWT auth middleware, logger
├── .env # Environment variables
└── server.js # Entry point

## API Endpoints
 ##Auth
POST /user/signin — Register a new user

POST /user/login — Log in and receive a JWT token

GET /user/profile -Show the login user profile

PUT /user/password -Change the password of login user.

## Cart
GET /cart — Get user cart (protected)

POST /cart/add -- Add the product in cart(protected)

PUT cart/:id — Update product quantity(protected)

DELETE cart/:id — Remove item from cart(protected)

## Products
GET /api/products — List all products

GET products/:id — Get product by ID

PUT products/:id — Update the product

DELETE products/:id --Delete the product

##  Installation

### 1. Clone the repository

```bash
git clone https://github.com/Majid0899/shoppy_globe_backend.git
cd shoppy_globe_backend

npm install


