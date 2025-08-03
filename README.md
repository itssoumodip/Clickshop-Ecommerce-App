
# ClickShop E-Commerce App

A full-stack e-commerce web application built with React, Node.js/Express, and MongoDB. ClickShop allows users to browse products, manage their shopping cart, and securely checkout. Admins can manage products and view orders.

## Features

- User authentication (JWT)
- Product listing and search
- Shopping cart functionality
- Order placement
- Admin dashboard for product and order management
- Responsive UI with Tailwind CSS

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT
- **Other:** PostCSS, dotenv, CORS

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/clickshop-ecommerce-app.git
   cd clickshop-ecommerce-app
   ```

2. **Setup backend:**
   ```sh
   cd backend
   npm install
   # Copy env.txt to .env and update credentials
   cp env.txt .env
   ```

3. **Setup frontend:**
   ```sh
   cd ../
   npm install
   ```

### Running the App

- **Start backend server:**
  ```sh
  cd backend
  npm start
  ```

- **Start frontend (React) app:**
  ```sh
  npm start
  ```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
Clickshop/
  backend/
    controller/
    middleware/
    model/
    route/
    mongo.connect.js
    server.js
    .env
  public/
  src/
    components/
    context/
    styles/
    App.jsx
    index.js
  package.json
  README.md
```

## Environment Variables

Create a `.env` file in the `backend/` folder:

```
PORT=5000
DB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=6d
```

## Scripts

- `npm start` – Start frontend development server
- `npm test` – Run frontend tests
- `npm run build` – Build frontend for production
- `npm run eject` – Eject Create React App configuration

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

## Author

- [Soumodip Das](https://github.com/itssoumodip)
