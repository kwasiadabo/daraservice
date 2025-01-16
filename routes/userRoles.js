const UserRole = require('../models/userRoles');
const RoleAccess = require('../models/roleAccess');

const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		role: Joi.string().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await UserRole.insertUserRole(req.body.role);
	res.json(result[0]);
});

router.put('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		role: Joi.string().required(),
		id: Joi.number().required(),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	const result = await UserRole.UpdateUserRole(req.body.id, req.body.role);
	res.json(result[0]);
});

router.post('/roleaccess', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	//	console.log(req.body);
	const body = req.body;
	const i = await Promise.all(
		body.map(async (r) => {
			await RoleAccess.insertRoleAccess(parseInt(r.role), r.menu, r.subMenu);
		})
	);
	res.json(i);
});

router.delete('/:id', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const result = await UserRole.deleteUserRole(req.params.id);
	res.json(result[0]);
});

router.get('/', (request, response) => {
	UserRole.getAllUserRoles().then((result) => {
		response.json(result[0]);
	});
});

router.get('/rolemenus/:role', (request, response) => {
	RoleAccess.getRoleMenus(request.params.role).then((result) => {
		console.log(result);
		response.json(result);
	});
});

router.get('/roleaccess/:role/:mId', (request, response) => {
	RoleAccess.getRoleAccess(request.params.role, request.params.mId).then(
		(result) => {
			//console.log(result[0]);
			response.json(result[0]);
		}
	);
});

router.get('/menu/:role/:staff', async (request, response) => {
	try {
		const role = request.params.role;
		const staff = request.params.staff;
		const result = await UserRole.getUserRoleMenus(role, staff);
		if (!result || result.length == 0) {
			return response
				.status(404)
				.send({ message: 'No menu found for this role.' });
		}
		const menuList = result[0];
		const menuWithSubs = await Promise.all(
			menuList.map(async (menu) => {
				console.log(menu);

				const subs = await getSubs(menu.mId);
				menu._children = subs; //to the current menu item

				return menu;
			})
		);
		//console.log(menuWithSubs);
		response.send(menuWithSubs);
	} catch (error) {
		console.error('Error fetching menu:', error);
	}
});

const getSubs = async (mId) => {
	const subs = await RoleAccess.getRoleAccess(mId);
	console.log(subs);
	return subs;
};

router.delete('/roleaccess/:id', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const result = await RoleAccess.deleteRoleAccess(req.params.id);
	res.json(result[0]);
});

router.get('/:id', (request, response) => {
	UserRole.getUserRole().then((result) => {
		response.json(result[0]);
	});
});

module.exports = router;
