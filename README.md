# Node.js Backend for User Authentication (Signup and Login)

This is a Node.js-based backend application that handles user authentication including signup, login, and token verification using JWT. The application is connected to a MySQL database for storing user information.

## Features
- **User Signup (Register)**: Users can create an account by providing their details.
- **User Login**: Users can log in using their credentials.
- **JWT Token Verification**: A token-based authentication system using JWT to secure routes.
- **MySQL Database**: The application connects to a MySQL database to store and retrieve user data.

## Tech Stack
- **Node.js**: Backend runtime
- **Express.js**: Web framework for routing and handling HTTP requests
- **MySQL**: Database for storing user data
- **JWT (jsonwebtoken)**: For generating and verifying authentication tokens
- **bcrypt**: Used for password hashing (optional, if you're using it for security)

## Installation

### 1. Clone the Repository
   ```bash
   git clone https://github.com/amna142/user-registeration-nodejs.git
   cd user-registeration-nodejs
