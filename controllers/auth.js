const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils');

module.exports = function(app) {
    // Register page
    app.get('/register', (req, res) => {
        let bodytype = utils.checkLog("register", req.user);
        res.render('auth/register', {bodytype, user: req.user});
    });
    // Register - POST
    app.post('/register', (req, res) => {
        let user = new User(req.body);
        let username = user.username;
        let password = user.password;

        // Cannot leave empty
        if((!username) || (!password)){
            return res.status(400).send('Cannot leave fields empty');
        }

        User.findOne({ 'username': username }).then((checkuser) => {
            // Check if user already exists
            if(checkuser){
                return res.status(400).send('Username already exists');
            }
            else{
            // Saving user and jwt token
                user.save(() => {
                    let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                });
            }
        }).catch((err) => {
            console.log(err);
        });
    });

    // Login
    app.get('/login', (req, res) => {
        let bodytype = utils.checkLog("login", req.user);
        res.render('auth/login', {bodytype, user: req.user});
    });

    // Login - POST
    app.post('/login', (req, res) => {
        User.findOne({ username: req.body.username }, "+password").then((user) => {
            if(!user){
                // If user does not exist, return error
                return res.status(401).send('Wrong email or password');
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch){
                    // If password does not match, return error
                    return res.status(401).send('Wrong email or password');
                }
                else{
                    // Else, make a cookie
                    let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
