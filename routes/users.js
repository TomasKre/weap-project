const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash')
 
router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    if (await User.findOne({ email: req.body.email })) {
        return res.status(400).send('That email is already in use!');
	} else if(await User.findOne({ name: req.body.name })) {
		return res.status(400).send('That username is already taken!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
		const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
    }
});
 
module.exports = router;