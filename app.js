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

app.get('/CurrentResources', function(req, res){
  res.render('resources');
});

app.post('/supplies/request/:name/:severity/:lat/:lng', function(req, res){
    var fs = require('fs');
    console.log('reached');

    var obj = {
        "name" : req.params.name,
        "severity": req.params.severity,
        "lat": req.params.lat,
        "lng": req.params.lng
    };

    console.log(JSON.stringify(obj));

    var file = './public/data/needSupplies.json';

    fs.readFile(file, function (err, data) {
        console.log('file read');
        if(err) throw err;
        var json = JSON.parse(data);
        json.push(obj);
        fs.writeFile(file, JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The data was appended to needSupplies!');
        });
    });
});

app.post('/supplies/add/:name/:food/:water/:gas/:lat/:lng', function(req, res){
    var fs = require('fs');
    console.log('reached');

    var obj = {
        "name" : req.params.name,
        "food": req.params.food,
        "water": req.params.water,
        "gas": req.params.gas,
        "lat": req.params.lat,
        "lng": req.params.lng
    };

    console.log(JSON.stringify(obj));

    var file = './public/data/supplies.json';

    fs.readFile(file, function (err, data) {
        console.log('file read');
        if(err) throw err;
        var json = JSON.parse(data);
        json.push(obj);
        fs.writeFile(file, JSON.stringify(json), function(err){
            if (err) throw err;
            console.log('The data was appended to supplies!');
        });
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
