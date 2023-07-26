var createError = require('http-errors');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const express = require('express');
const app = express();
const cors = require('cors');
var rateLimit = require('express-rate-limit');

app.use(cors());
// view engine setup

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 65, // Limit each IP to 65 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Connect to MongoDB Atlas

module.exports = app;
