const express = require("express");
const app = express()

const dotenv = require("dotenv");

const colors = require("colors");
const path = require("path");
app.use(express.json());
const connectDB = require("./config/database");
dotenv.config({ path: "./config/config.env" });







connectDB();
const port = 2000;
 app.listen(port,()=>{
  console.log('server is running  on port  '+port);
})