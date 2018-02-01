const jwt = require('jsonwebtoken');
const utils = require('./utils');
const http = require('http');
const express = require('express');
const request = require('request');


module.exports = function(app) {
    // Register page
    app.get('/register', (req, res) => {
        let bodytype = utils.checkLog("register", req.user);
        res.render('auth/register', {bodytype, user: req.user});
    });

    // Register - POST
    app.post('/register', (req, res) => {
        // Register data
        let postData = JSON.stringify(req.body);
        let route = utils.checkStatus() + "/auth/register";

        const options = {
            url: route,
            json: req.body,
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };

        let registerReq = new Promise((resolve, reject) => {
            request.post(options, function(err, response, body) {
                if(body.status === 'Success'){
                    resolve(body.message);
                }
                else{
                    reject(body.message);
                }
            });
        }).then((message) => {
            res.redirect('/login');
        }).catch((err) => {
            res.status(401).send(err);
        });
    });

    // Login
    app.get('/login', (req, res) => {
        let bodytype = utils.checkLog("login", req.user);
        res.render('auth/login', {bodytype, user: req.user});
    });

    // Login - POST
    app.post('/login', (req, res) => {
        // Login data
        let postData = JSON.stringify(req.body);
        let route = utils.checkStatus() + "/auth/login";

        const options = {
            url: route,
            json: req.body,
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };

        let loginReq = new Promise((resolve, reject) => {
            request.post(options, function(err, response, body) {
                if(body.status === 'Success'){
                    resolve(body.data.token);
                }
                else{
                    reject(body.message);
                }
            });
        }).then((token) => {
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            res.redirect('/');
        }).catch((err) => {
            console.log(err)
            res.status(401).send(err);
        });
    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
