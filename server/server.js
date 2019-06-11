// server.js

// init project
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require("path");
require("./database");

//Settings Express app
//proces.env.port is a suggested when the app is deployed to cloud
app.set("port", process.env.PORT || 3000);

//Middleware
//Is not required to install body-parser in the current node version
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/client")));
//Routes
const userRoutes = require("./src/routes/user.route");
const productRoutes = require("./src/routes/product.route");
const categoryRoutes = require("./src/routes/category.route");
const adsRoutes = require("./src/routes/ads.route");
const supplierRoutes = require("./src/routes/supplier.route");
const saleRoutes = require("./src/routes/sale.route");
const semesterRoutes = require("./src/routes/semester.route");
const careerRoutes = require("./src/routes/career.route");
const lockerRoutes = require("./src/routes/locker.route");
const aporteRoutes = require("./src/routes/aporte.route");

//URI
//https://aeie.glitch.me/

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/locker", lockerRoutes);
app.use("/api/aporte", aporteRoutes);
/*
app.use("/api/student", studentRoutes);

app.use("/api/course", courseRoutes);

*/

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/client/index.html"));
});

// listen for requests :)
const listener = app.listen(app.get("port"), function() {
  console.log("Your app is listening on port " + listener.address().port);
});
