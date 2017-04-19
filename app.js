//app.js
//Wed Apr 19 15:09:45 IST 2017
//Indrajith Indraprastham

    var express       = require('express');
    var path          = require('path');
    var favicon       = require('serve-favicon');
    var logger        = require('morgan');
    var cookieParser  = require('cookie-parser');
    var bodyParser    = require('body-parser');
    var stylus        = require('stylus');
    var passport      = require('passport');
    var flash         = require('connect-flash')
    var session       = require('express-session');
    var app           = express();
    var router        = express.Router();


// configuration ===============================================================

//Express app

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// For Passport
    app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions



// routes ======================================================================
//require('./app-old/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Reculta' });
});


//app.use('/', index);
//app.use('/users', users);
//app.use('/login', login);
//app.use('/signup', signup);


    console.log('app running on http://127.0.0.1:3000/');

//Models
    var models = require("./app/models");


    //Routes
    var authRoute = require('./app/routes/auth.js')(app,passport);


    //load passport strategies
    require('./app/config/passport/passport.js')(passport,models.user);


    //Sync Database
    models.sequelize.sync().then(function(){
    console.log('Nice! Database looks fine')

    }).catch(function(err){
    console.log(err,"Something went wrong with the Database Update!")
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





