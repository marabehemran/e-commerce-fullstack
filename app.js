const path = require("path");

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const ApiError = require("./utils/ApiError");
const gloabalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

//routes
const mountRoutes = require("./routes");

//Connection with database
dbConnection();

//express app
const app = express();

//Middleware
app.set("query parser", "extended");

app.use(express.json());

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes
mountRoutes(app);

app.all("/*splat", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

//Global error handling middleware
app.use(gloabalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App runing on PORT ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors:${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`shut down.....`);
    process.exit(1);
  });
});
