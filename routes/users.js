const Users = require('../models/users');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

router.post('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
		staff: Joi.number().required(),
		branch: Joi.number().required(),
		userRole: Joi.string().allow(''),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	console.log(req.body);
	const result = await Users.insertUser(
		req.body.username,
		req.body.password,
		req.body.staff,
		req.body.branch,
		req.body.userRole
	);
	let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' });
	res.json(token);
});

router.put('/:id', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		//id: Joi.string().required(),
		password: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await Users.changePassword(req.params.id, req.body.password);
	let token = jwt.sign(req.body, 'myshhhh', { expiresIn: '3h' });
	res.json(token);
});

router.get('/useraccounts', (request, response) => {
	Users.getUserAccounts().then((result) => {
		//console.log(result);
		response.json(result);
	});
});

// router.get('/allusers', (request, response) => {
// 	users.getAllUsers().then((result) => {
// 		//console.log(result[0]);
// 		response.json(result[0]);
// 	});
//});

router.get('/userbynamepass/:UserName/:Password', (request, response) => {
	Users.getUserByUserPassword(
		request.params.UserName,
		request.params.Password
	).then((result) => {
		// console.log(result[0])
		response.json(result[0]);
	});
});

module.exports = router;
