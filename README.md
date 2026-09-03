# E-Commerce Full-Stack

A full-stack e-commerce application built with React, Redux Toolkit, Node.js, Express, and MongoDB.

I built this project while learning full-stack development. The backend was based on concepts and structure I learned during a Node.js course, then I continued developing it and added my own changes and features.

For the frontend, I took a different approach by using Redux Toolkit, changing the project structure and UI, and connecting it with the backend APIs.

## Features

- Authentication and authorization
- User, Manager, and Admin roles
- Product management
- Categories and subcategories
- Brand management
- Shopping cart
- Wishlist
- Product reviews
- Coupons and discounts
- Orders
- Stripe test payment
- Search, filtering, sorting, and pagination
- Admin and Manager management pages

## Technologies

### Frontend
- React.js
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Stripe

## Project Structure

```text
e-commerce-fullstack/
├── front-react/     # React frontend
└── back-node/       # Node.js/Express backend
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/marabehemran/e-commerce-fullstack.git
cd e-commerce-fullstack
```

### Backend

```bash
cd back-node
npm install
npm start
```

### Frontend

Open another terminal:

```bash
cd front-react
npm install
npm start
```

The backend runs locally on `http://localhost:8000`.

## Environment Variables

The backend requires environment variables for the database connection, JWT authentication, Stripe, and other configuration.

Create your own `.env` file before running the backend.

Do not commit your `.env` file or secret keys to GitHub.

## Demo

A video demo of the project is available on my LinkedIn profile.

A live demo will be added soon.

## Author

Emran Marabeh

[GitHub Profile](https://github.com/marabehemran)
