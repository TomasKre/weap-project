const jwt = require('jsonwebtoken');
const config = require('config');
const express = require("express");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');

const app = new express();
 
module.exports = function (req, res, next) {
	if (req.session.userId) {
        next();
    } else {
		res.redirect('./../../../')
	}

};
