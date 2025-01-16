const UserRole = require('../models/userRoles');
const UserAccess = require('../models/userAccess');

const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.post('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let results = 0;
	let msg = '';
	//console.log(req.body);
	const data = req.body;
	results = data.map(async (d) => {
		console.log(d);
		msg = await UserAccess.insertUserAccess(d.nameOfStaff, d.mId, d.id);
	});
	// console.log(res.status(200).send('User Access Delivered for saving'));
	res.json('User Access Delivered. [' + msg + ']');
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

// router.post('/roleaccess', async (req, res) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	const body = req.body;
// 	const i = body.map(async (r) => {
// 		await RoleAccess.insertRoleAccess(parseInt(r.role), r.mId, r.id);
// 	});
// 	res.json(req.body);
// });

router.get('/', (request, response) => {
	UserRole.getAllUserRoles().then((result) => {
		response.json(result[0]);
	});
});

router.get('/:staff', async (request, response) => {
	try {
		const staff = request.params.staff;
		const result = await UserAccess.getUserMenus(staff);
		if (!result || result.length == 0) {
			return response
				.status(404)
				.send({ message: 'No menu found for this user.' });
		}
		const menuList = result[0];
		const menuWithSubs = await Promise.all(
			menuList.map(async (menu) => {
				if (staff == menu.staff) {
					const subs = await getSubs(staff, menu.mId);
					menu._children = subs; //to the current menu item
				} else {
					menu._children = [];
				}
				return menu;
			})
		);
		//console.log(menuWithSubs);
		response.send(menuWithSubs);
	} catch (error) {
		console.error('Error fetching user menus:', error);
	}
});

const getSubs = async (staff, mId) => {
	const subs = await UserAccess.getUserAccess(staff, mId);
	return subs;
};

router.delete('/:id', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const result = await UserAccess.deleteUserAccess(req.params.id);
	res.json(result[0]);
});

router.get('/myroles/:staff', (request, response) => {
	UserRole.getMyAccess(request.params.staff).then((result) => {
		response.json(result[0]);
	});
});

router.get('/:id', (request, response) => {
	UserRole.getUserRole().then((result) => {
		response.json(result[0]);
	});
});

module.exports = router;
