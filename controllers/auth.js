const User = require('../models/user.js')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils')

module.exports = function(app) {
    // Register page
    app.get('/register', (req, res) => {
        let bodytype = utils.checkLog("register", req.user)
        res.render('auth/register', {bodytype, user: req.user})
    })

    app.post('/register', (req, res) => {
        let user = new User(req.body);
        let username = user.username
        let password = user.password

        // Cannot leave empty
        if((!username) || (!password)){
            return res.status(400).send('Cannot leave fields empty')
        }

        User.findOne({ 'username': username }).then((checkuser) => {
            // Check if user already exists
            if(checkuser){
                return res.status(400).send('Username already exists')
            }
            else{
            // Saving user and jwt token
                user.save(() => {
                    let token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: "60 days" });
                    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                    res.redirect('/');
                }).catch((err) => {
                    res.send(err.message)
                })
            }
        }).catch((err) => {
            console.log(err, "Something happened while registering")
        })
    });

}
