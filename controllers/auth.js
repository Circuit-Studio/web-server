const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils');
const http = require('http');

// if(process.env.STATUS == "development"){
//     const api = process.env.STAGING_API_URL;
// }
// else if(process.env.STATUS == "production"){
//     const api = process.env.PRODUCTION_API_URL;
// }

const api = process.env.STAGING_API_URL;

module.exports = function(app) {
    // Register page
    app.get('/register', (req, res) => {
        let bodytype = utils.checkLog("register", req.user);
        res.render('auth/register', {bodytype, user: req.user});
    });

    // Register - POST
    app.post('/register', (req, res) => {
        let postData = JSON.stringify(req.body);
        const post_options = {
            hostname: String(api),
            port: 80,
            path: '/auth/register',
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            }
        };

        const post_req = http.request(post_options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log("Response" + chunk);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
        });

        post_req.write(postData);
        post_req.end();
    });

    // Login
    app.get('/login', (req, res) => {
        let bodytype = utils.checkLog("login", req.user);
        res.render('auth/login', {bodytype, user: req.user});
    });

    // Login - POST
    app.post('/login', (req, res) => {

    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
