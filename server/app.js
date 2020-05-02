var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { PORT, DB_URL } = require("./configs/config");

let userData = require("./scripts/userData");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.listen(process.env.PORT, process.env.CLIENT_ORIGIN);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/userdata", userData.userToDB);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//DB connection
mongoose
  .connect(
    DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },

    () => {
      app.listen(PORT, () => console.log("DB connection established"));
    }
  )
  .catch((err) => console.log(err));

module.exports = app;
