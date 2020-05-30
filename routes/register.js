const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.get('/', function (req, res) {
	res.render('./../views/register.ejs');
});
 
router.post('/', async (req, res) => {

    // Check if this user already exisits
	console.log(req.body);
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send('That email is already in use!');
	} else if(await User.findOne({ name: req.body.username })) {
		return res.status(400).send('That username is already taken!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
		const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
		
        await user.save();
		
        const token = user.generateAuthToken();
        res.header('x-auth-token', token);
		
		res.redirect('/tasks/:username');
		res.send();
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