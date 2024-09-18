const express = require("express");
const path = require("path");
const cors = require("cors");
const sequelize = require('./src/config/db');

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// Database synchronization
sequelize.sync();

// Static file serving
app.use('/images', express.static(path.join(__dirname, 'upload/images')));
app.use(express.static(path.join(__dirname, '../admin/build')));

// Routes (API)
const userRoute = require('./src/routes/userRoute.js');
const productRoute = require('./src/routes/productRoute.js');
const cartRoute = require('./src/routes/cartRoute.js');
const categoryRoute = require('./src/routes/categoryRoute.js');
const orderRoutes = require('./src/routes/orderRoute.js');
const stripeRoute = require('./src/routes/Stripe.js');
const statisticRoute = require('./src/routes/statisticRoute.js');

app.use('/api/auth', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/category', categoryRoute);
app.use('/api/order', orderRoutes);
app.use('/api/stripe', stripeRoute);
app.use('/api/statistic', statisticRoute);

// Serve the frontend for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
});

// Root route
app.get("/", (req, res) => {
  res.send("Root");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  if (!error) console.log("Server running on port " + port);
  else console.log("Error: ", error);
});
