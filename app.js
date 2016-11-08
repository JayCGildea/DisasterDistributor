var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.get('/', function(req, res){
    res.render('index');
});

app.get('/map', function(req, res){
  res.render('index');
});

app.get('/supplies', function(req, res){
  getData(function(supply){
    res.json(supply);
  });
});

app.get('/supplies/:id', function(req, res){
    getData(function(supply){
        res.render('data', {supply: supply.byId[req.params.id], layout:null });
  });
});

app.get('/supplies/add/:id/:name/:food/:water/:gas/:shelter/:geo', function(req, res) {
    var id = req.params.id;
    var name = req.params.name;
    var food = req.params.food;
    var water = req.params.water;
    var gas = req.params.gas;
    var shelter = req.params.shelter;
    var geo = req.params.geo;

    var fs = require('fs');
    var obj;
    fs.readFile('/data/supplies.js', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
       document.write(obj);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
