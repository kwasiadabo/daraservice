const { all } = require('express/lib/application');
const sql = require('mssql');
const db = require('../startup/db');

async function insertMenu(menu, description, name, tag, icon) {
	try {
		let pool = await sql.connect(db);
		let Menu = await pool
			.request()
			.input('menu', sql.NVarChar, menu)
			.input('description', sql.NVarChar, description)
			.input('name', sql.NVarChar, name)
			.input('tag', sql.NVarChar, tag)
			.input('icon', sql.NVarChar, icon)
			.execute('uspInsertMenu');
		return Menu.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function updateMenu(menu, description, name, tag, icon, id) {
	try {
		let pool = await sql.connect(db);
		let Menu = await pool
			.request()
			.input('menu', sql.NVarChar, menu)
			.input('description', sql.NVarChar, description)
			.input('name', sql.NVarChar, name)
			.input('tag', sql.NVarChar, tag)
			.input('icon', sql.NVarChar, icon)
			.input('id', sql.Int, id)
			.execute('uspUpdateMenu');
		return Menu.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function insertSubMenu(menu, subMenu, _tag, name, to, label, icon) {
	try {
		let pool = await sql.connect(db);
		let Menu = await pool
			.request()
			.input('menu', sql.NVarChar, menu)
			.input('subMenu', sql.NVarChar, subMenu)
			.input('tag', sql.NVarChar, _tag)
			.input('name', sql.NVarChar, name)
			.input('to', sql.NVarChar, to)
			.input('label', sql.NVarChar, label)
			.input('icon', sql.NVarChar, icon)
			.execute('uspInsertSubMenus');
		return Menu.recordset[0];
	} catch (error) {
		console.log(error);
	}
}

async function updateSubMenu(subMenu, name, to, icon, id) {
	try {
		let pool = await sql.connect(db);
		let Menu = await pool
			.request()

			.input('subMenu', sql.NVarChar, subMenu)
			.input('name', sql.NVarChar, name)
			.input('to', sql.NVarChar, to)
			.input('icon', sql.NVarChar, icon)
			.input('id', sql.Int, id)

			.execute('uspUpdateSubMenu');
		return Menu.recordset[0];
	} catch (error) {
		console.log(error);
	}
}

async function getMenus(req) {
	try {
		let pool = await sql.connect(dbconn);
		let menusRequest = await pool
			.request()
			.input('val', sql.Int, req)
			.query('select * from vwMenus where menu_level=@val');
		//console.log(menusRequest.recordsets);
		return menusRequest.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getMainMenus() {
	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			// .input('id', sql.Int, id)
			// .input('password', sql.NVarChar, hash)
			.execute('uspGetMenus');
		//console.log(User.recordsets[0]);
		return User.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function getSubMenus(menu) {
	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			.input('menu', sql.NVarChar, menu)
			// .input('password', sql.NVarChar, hash)
			.execute('uspGetSubMenus');
		//console.log(User.recordsets[0]);
		return User.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function getAllSubMenus() {
	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			//.input('menu', sql.NVarChar, menu)
			// .input('password', sql.NVarChar, hash)
			.execute('uspSelectMenus');
		//console.log(User.recordsets[0]);
		return User.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getMenus,
	getMainMenus,
	insertMenu,
	updateMenu,
	insertSubMenu,
	getSubMenus,
	updateSubMenu,
	getAllSubMenus,
};
