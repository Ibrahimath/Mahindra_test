
// packages
require("dotenv").config();
import express from "express";
const app = express();
import bodyParser from "body-parser";
import {sequelize}  from "./models";
const cors = require("cors");


const port = process.env.PORT || 3100;
const userRoutes = require("./routes/user");
//const adminRoutes = require("./routes/admin");


app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", userRoutes);
//app.use("/api/v1/admin", adminRoutes);

app.use((req:any, res:any) => {
  res.status(404).json({
    status: false,
    message: "page not found",
  });
});
sequelize.authenticate().then(
  app.listen(port, () => {
    console.log(`running on port ${port}`);
  })
);

module.exports = app;
