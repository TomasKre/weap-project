const auth = require('./../middleware/auth')
const {Task, validate} = require('./../models/task');
const { User } = require('./../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const taskmodel = mongoose.model('Task', Task);
	
router.get('/:username', async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	
	const tasks = await taskmodel
        .find({ user: user.id })
		.select({ title: 1, content: 1});

    res.render("tasks.ejs", {Tasks: tasks});
	
});

router.get('/:username/json', async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	
	const tasks = await taskmodel
        .find({ user: user.id })
		.select({ title: 1, content: 1, done: 1});

    return res.send(tasks);
	
});


router.post('/:username', auth, async (req, res) => {

    const { error } = validate(req.body.title, req.body.content, req.body.user);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

	const taskdoc = new taskmodel({
		title: req.body.title, 
		content: req.body.content,
		done: false,
		user: req.body.user
	});

	const result = await taskdoc.save();
	console.log(result);
	
	res.redirect('/');
	res.send();
});





router.put('/:username/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    const task = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title, title: req.body.title }, {
        new: true
    });
 
    if (!task) {
        return res.status(404).send('That task ID was not found');
    }
 
    res.send(task);
});

router.delete('/:username/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
 
    if (!task) {
        return res.status(404).send('That task ID was not found');
    }
 
    res.send(task);
});
 
module.exports = router;