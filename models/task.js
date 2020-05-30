const Joi = require('joi');
const mongoose = require('mongoose');
const user = require('./../models/user');
Joi.objectId = require('joi-objectid')(Joi);
 
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 64
    },
	content: {
		type: String,
		required: true,
		maxlength: 256
	},
	done: {
		type: Boolean,
		default: false
	},
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    }
});

const task = mongoose.model('Task', taskSchema);

function validateTask(title, content, user) {
    const schema = {
        title: Joi.string().max(64).required(),
		content: Joi.string().max(256).required(),
		user: Joi.objectId().required()
    };
 
    return Joi.validate(schema);
}
 
exports.taskSchema = taskSchema;
exports.task = task;
exports.validate = validateTask;