const User = require('../models/User');
const flash = require('express-flash');
const passport = require('passport');

/**
 * POST /signup
 * Create a new local account.
 */

exports.postSignup = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = req.validationErrors();

   // console.log(errors);

    if(errors) {
        res.send('error');
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    console.log(user);

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        console.log('ok');
        if (err) {
            console.log('error');
            return next(err);
        }
        if (existingUser) {
            console.log('exist');
            req.flash('errors', {msg: 'Account with that email address already exists.'});
            const errors = req.validationErrors();
            console.log(errors);
            return null;
        }
        user.save((err)=> {
            if(err){
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                console.log('saved !!');
                res.redirect('/');
            });
        })
    });
};
