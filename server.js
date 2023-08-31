const express = require("express");
const dbconnect = require("./Config/db");
dbconnect();
const app = express();
app.use(express.json());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { User, Restaurant, Review } = require("./Routes/index");

app.use("/user", User.route);
app.use("/restaurant", Restaurant.route);
app.use("/review", Review.route);

require("dotenv").config();
const dotenv = require("dotenv");
dotenv.config();

app.listen(5500, () => {
  console.log(`Server started at ${process.env.PORT}`);
});
