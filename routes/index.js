var express = require('express');
var router = express.Router();
var passport      = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Reculta' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Reculta' , message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/true', // redirect to the secure profile section
            failureRedirect : '/false', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    console.log('not logged in')
    res.redirect('/login');
}

// process the signup form

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Reculta' });
});

router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/true', // redirect to the secure profile section
        failureRedirect : '/false', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

router.get('/true', function(req, res, next) {
  res.send('success');
});

router.get('/false', function(req, res, next) {
  res.send('failure');
});




    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


module.exports = router;
