const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const expressSession = require('express-session');
	
router.get('/', async (req, res) => {
	// If user already logged in in this session
	req.session.userId = null;
	if (req.session.userId) {
		var logged_user = await User.findOne({ _id: req.session.userId });
        res.redirect('/tasks/' + logged_user.name + '/')
    } else {		
		res.render('./../views/index.ejs', {badLogin : false});
	}
});

router.post('/', async (req, res) => {
	var validPassword;
	
    // Find user 
    var mail = await User.findOne({ email: req.body.username });
	if (!mail) {
		var user = await User.findOne({ name: req.body.username });
		if (!user) {
			res.render('./../views/index.ejs', {badLogin : true});
		} else {
			// Login with name
			validPassword = await bcrypt.compare(req.body.password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    res.redirect('/tasks/' + user.name + '/')
                } else {
                    res.render('./../views/index.ejs', {badLogin : true});
                }
            });
		}
	} else {
		// Login with mail
		validPassword = await bcrypt.compare(req.body.password, mail.password, (error, same) => {
            if (same) {
                req.session.userId = mail._id
                res.redirect('/tasks/' + mail.name + '/')
            } else {
                res.render('./../views/index.ejs', {badLogin : true});
            }
        });
	}
});
 
function validate(req) {
    const schema = {
		name: Joi.string().min(5).max(64).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}
 
module.exports = router; 