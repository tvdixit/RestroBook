const express = require("express");
const twilio = require('twilio');
const dbconnect = require("./Config/db");
dbconnect();
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const { User } = require("./Routes/index")

app.use("/user", User.route);

require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

app.listen(5500, () => {
    console.log(`Server started at ${process.env.PORT}`);
})