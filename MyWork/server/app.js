const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitization = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");

const userRouter = require("./src/routes/userRoutes");
const manageRouter = require("./src/routes/manageRoutes");
const recordRouter = require("./src/routes/recordRoutes");
const teamRouter = require("./src/routes/teamRoutes");

const app = express();

// 1) Global middlewares
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this ip, please try again in an hour",
});
app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitization());

app.use(xss());

app.use(
  hpp({
    whitelist: [
      // TODO
    ],
  })
);

// 2) ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/manage", manageRouter);
// app.use("/active/:token", manageRouter);
app.use("/api/v1/records", recordRouter);
app.use("/api/v1/teams", teamRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} in this server`, 404));
});

// 3) ERRORS HANDLING
app.use(globalErrorHandler);

module.exports = app;
