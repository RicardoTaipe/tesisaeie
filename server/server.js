// server.js

// init project
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
require("./database");

//Settings Express app
//proces.env.port is a suggested when the app is deployed to cloud
app.set("port", process.env.PORT || 3000);

//Middleware
//Is not required to install body-parser in the current node version
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Routes
const userRoutes = require('./src/routes/user.route');
const roleRoutes = require('./src/routes/role.route');
/*
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const adsRoutes = require('./routes/ads.route');
const supplierRoutes = require('./routes/supplier.route');
const userRoutes = require('./routes/user.route');
const saleRoutes = require('./routes/sale.route');
*/
//URI
//https://aeie.glitch.me/




app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
/*
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/supplier', supplierRoutes);

app.use('/api/sale', saleRoutes);
*/

app.get("/", (req, res) => {
  res.json("hallo");
});

// listen for requests :)
const listener = app.listen(app.get("port"), function() {
  console.log("Your app is listening on port " + listener.address().port);
});
