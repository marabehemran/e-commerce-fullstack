const path = require("path");

const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const ApiError = require("./utils/ApiError");
const gloabalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

//routes
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
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
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);

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
