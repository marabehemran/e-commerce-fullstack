const express = require("express");
const morgan = require("morgan");

require("dotenv").config();

const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
//Connection with database
dbConnection();

//express app
const app = express();

//Middleware
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes
app.use("/api/v1/categories", categoryRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App runing on PORT ${PORT}`);
});
