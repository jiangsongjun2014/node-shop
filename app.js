var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 初始化数据库
var mysql = require("./sql/mysql.js");
// 引入路由
var router = require('./routes/index');
// 使用express框架
var app = express();

// 使用模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 使用日志
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads" ,express.static(path.join(__dirname, 'uploads')));
// 初始化路由
router(app)




// 处理404
app.use(function(req, res, next) {
  next(createError(404));
});

// 处理500
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
