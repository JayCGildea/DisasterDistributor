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

app.get('/supplies/add/:name/:food/:water/:gas/:lat/:lng', function(req, res){
    var jsonfile = require('jsonfile');

    var file ='./public/data/supplies.json';

    var obj = {
        name: req.params.name,
        food: req.params.food,
        water: req.params.water,
        gas: req.params.gas,
        lat: req.params.lat,
        lng: req.params.lng
    };
    jsonfile.readfile(file, function(err, jsonobj) {
        console.write(jsonobj);
        jsonobj.push(obj);
        console.write(jsonobj);
        jsonfile.writeFile(file, jsonobj, function (err) {
            console.error(err);
        });
    });
});

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
