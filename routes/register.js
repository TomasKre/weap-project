const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const expressSession = require('express-session');


router.get('/', function (req, res) {
	res.render('./../views/register.ejs');
});
 
router.post('/', async (req, res) => {

    // Check if this user already exisits
	console.log(req.body);
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send('Tento email je již používán!');
	} else if(await User.findOne({ name: req.body.username })) {
		return res.status(400).send('Toto uživatelské jméno je již obsazené!');
    } else if(req.body.password1 != req.body.password2) {
		return res.status(400).send('Hesla se neshodují!');
	} else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password1
        });
		const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
		
        await user.save();
		
		req.session.userId = user._id;
		res.redirect('/tasks/' + user.name + '/');
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