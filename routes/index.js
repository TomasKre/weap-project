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
 
router.get('/', function (req, res) {
	res.render('./../views/index.ejs');
})

router.post('/', async (req, res) => {
 
    // Find user 
    var mail = await User.findOne({ email: req.body.email });
	if (!mail) {
		var user = await User.findOne({ email: req.body.name });
		if (!user) {
			return res.status(400).send('Incorrect email or nickname.');
		} else {
			// Login with name
			const validPassword = await bcrypt.compare(req.body.password, user.password);
		}
		
		// Login with mail
		const validPassword = await bcrypt.compare(req.body.password, mail.password);
	}
	
	if (!validPassword) {
		return res.status(400).send('Incorrect password.');
	}
	const token = user.generateAuthToken();
	res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
	res.send(token);
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