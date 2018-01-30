const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils');
const http = require('http');
const express = require('express');
const request = require('request');

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
        // Register data
        let postData = JSON.stringify(req.body);
        let route = String(api) + "/auth/register";

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
        let route = String(api) + "/auth/login";

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
                if(body.token){
                    resolve(body.token);
                }
                else{
                    reject(body.message);
                }
            });
        }).then((token) => {
            res.cookie('nToken', token, { maxAge: 900000, secure: false, httpOnly: false });
            res.redirect('/');
        }).catch((err) => {
            res.status(401).send(err);
        });


    });

    // Logout
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
