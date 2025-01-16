const menus = require('../models/menus');
const express = require('express');
const { response } = require('express');
const Joi = require('joi');
const router = express.Router();

router.post('/mainmenu', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		menu: Joi.string().required(),
		description: Joi.string().required(),
		name: Joi.string().required(),
		_tag: Joi.string().required(),
		icon: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await menus.insertMenu(
		req.body.menu,
		req.body.description,
		req.body.name,
		req.body._tag,
		req.body.icon
	);
	res.json(result[0]);
});

router.put('/mainmenu', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		menu: Joi.string().required(),
		description: Joi.string().required(),
		name: Joi.string().required(),
		_tag: Joi.string().required(),
		icon: Joi.string().required(),
		id: Joi.number().allow(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await menus.updateMenu(
		req.body.menu,
		req.body.description,
		req.body.name,
		req.body._tag,
		req.body.icon,
		req.body.id
	);
	res.json(result[0]);
});

router.get('/menus/:val', (request, response) => {
	menus.getMenus(request.params.val).then((result) => {
		//console.log(result[0]);
		response.json(result[0]);
	});
});

router.get('/mainmenu', (request, response) => {
	menus.getMainMenus().then((result) => {
		//console.log(result);
		response.json(result);
	});
});

router.post('/submenu', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	//console.log(req.body);
	const schema = Joi.object({
		menu: Joi.string().required(),
		subMenu: Joi.string().required(),
		_tag: Joi.string().required(),
		name: Joi.string().required(),
		to: Joi.string().required(),
		label: Joi.string().required(),
		icon: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await menus.insertSubMenu(
		req.body.menu,
		req.body.subMenu,
		req.body._tag,
		req.body.name,
		req.body.to,
		req.body.label,
		req.body.icon
	);
	res.json(result);
});

router.put('/submenu', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	//console.log(req.body);
	const schema = Joi.object({
		menu: Joi.string().required(),
		//mId: Joi.number().required(),
		subMenu: Joi.string().required(),
		_tag: Joi.string().required(),
		name: Joi.string().required(),
		to: Joi.string().required(),
		label: Joi.string().required(),
		icon: Joi.string().required(),
		id: Joi.number().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await menus.updateSubMenu(
		req.body.subMenu,
		req.body.name,
		req.body.to,
		req.body.icon,
		req.body.id
	);
	res.json(result);
});

router.get('/submenu/all', (request, response) => {
	menus.getAllSubMenus().then((result) => {
		//console.log(result);
		response.json(result);
	});
});

router.get('/submenu/:menu', (request, response) => {
	menus.getSubMenus(request.params.menu).then((result) => {
		//console.log(result);
		response.json(result);
	});
});

module.exports = router;
