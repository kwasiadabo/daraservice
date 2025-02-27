const express = require('express');
const Joi = require('joi');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().required(),
	});
	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	//const salt = await bcrypt.genSalt(10)
	//const hash = await bcrypt.hash(req.body.password, salt)

	const user = await User.getUserByUserPassword(req.body.username);
	//console.log(user)

	if (!user) return res.status(400).send('Invalid email or password No User');

	//let finalString = user.userPassword.substring(0, user.userPassword.length - 8)
	//console.log('user typed Password:' + req.body.password);
	const userTypePassword = req.body.password;
	const dbPassword = user.userPassword;

	const validPassword = bcrypt.compareSync(userTypePassword, dbPassword);

	if (!validPassword)
		return res.status(400).send('Invalid Username or password');
	let token = jwt.sign(user, 'myshhhh', { expiresIn: '20m' });
	res.send(token);
});

module.exports = router;
