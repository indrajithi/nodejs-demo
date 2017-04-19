var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Reculta' });
});

app.get('/signup', authController.signup);


app.get('/login', authController.login);


app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/login',
                                                    failureRedirect: '/'}
                                                    ));


app.get('/dashboard',isLoggedIn, authController.dashboard);


app.get('/logout',authController.logout);


app.post('/login', passport.authenticate('local-signin',  { successRedirect: '/dashboard',
                                                    failureRedirect: '/login'}
                                                    ));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}


}






