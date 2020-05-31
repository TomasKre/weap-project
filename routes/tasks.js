const auth = require('./../middleware/auth')
const {Task, validate} = require('./../models/task');
const { User } = require('./../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const taskmodel = mongoose.model('Task', Task);
	
router.get('/:username', auth, async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	
	const tasks = await taskmodel
        .find({ user: user.id })
		.select({ title: 1, content: 1, done: 1});

    res.render("tasks.ejs", {Tasks: tasks, userid: user._id, error: ""});
	
});

router.get('/:username/jsonall', auth, async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	
	const tasks = await taskmodel
        .find({ user: user.id })
		.select({ title: 1, content: 1, done: 1});

    return res.json(tasks);
	
});

router.get('/:username/jsonfinished', auth, async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	const tasks = await taskmodel
        .find({ user: user.id, done: true})
		.select({ title: 1, content: 1, done: 1});

    return res.json(tasks);
	
});

router.get('/:username/jsonnotfinished', auth, async function(req, res) {
	let user = await User.findOne({ name: req.params.username });
	if (!user) {
		res.status(404).send('Not found');
	};
	
	const tasks = await taskmodel
        .find({ user: user.id, done: false })
		.select({ title: 1, content: 1, done: 1});

    return res.json(tasks);
	
});


router.post('/:username/add', auth, async (req, res) => {
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
	
	res.redirect('./../');
});

router.post('/:username/finish', auth, async (req, res) => {
    const finished = await taskmodel.findByIdAndUpdate(_id = req.body.fin_id, { $set: { done: true }});

    if (!finished) {
        return res.status(404).send('That task ID was not found');
    }
 
	const result = await finished.save();

    res.redirect('./../');
});

router.post('/:username/update/', auth, async (req, res) => {
	const { error } = validate(req.body.title, req.body.content);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    const updated = await taskmodel.findByIdAndUpdate(_id = req.body.upd_id, { title: req.body.title, content: req.body.content });
 
    if (!updated) {
        return res.status(404).send('That task ID was not found');
    }
 
    res.redirect("./../");
});

router.post('/:username/delete', auth, async (req, res) => {
	
	const deleted = await taskmodel.findByIdAndRemove({ _id: req.body.del_id});
 
    if (!deleted) {
        return res.status(404).send('That task ID was not found');
    }
 
    res.redirect("./../");
});

router.get('/:username/logout', auth, async (req, res) => {
    req.session.userId = null;
    res.redirect("/");
});


 
module.exports = router;