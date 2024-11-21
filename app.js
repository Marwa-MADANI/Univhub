const express = require("express");
const userRoutes = require("./Routes/userRoutes");
const annonceRoutes = require("./Routes/annonceRoutes");
const signalementRoutes = require("./Routes/signalementRoutes");
const handlerError = require("./Controllers/errorController");
const dotenv = require("dotenv");
const pug = require("pug");
const path = require("path");
const AppError = require("./utils/appError");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

////////////// Environement variables ////////////////
dotenv.config({ path: "./config.env" });

////////////// Initialisation Server Express ////////////////
app = express();

////////////// Cookies Parser ////////////////
app.use(cookieParser());

////////////// Cors ////////////////
app.use(
  cors({
    origin: "http://127.0.0.1:5502", // Replace this with your client's origin
    credentials: true,
  })
);

////////////// Body parser: reading data from body ////////////////
app.use(express.json());

////////////// Compressing all the text sent to the client ////////////////
app.use(compression());

////////////// Configuration views with pug ////////////////
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

////////////// Host files from local to server ////////////////
app.use(express.static(path.join(__dirname, "public")));

////////////// EndPoints ////////////////
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/annonces", annonceRoutes);
app.use("/api/v1/signalements", signalementRoutes);

app.all("*", (request, response, next) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});

app.use(handlerError);

module.exports = app;
