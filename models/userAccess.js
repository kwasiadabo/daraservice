const sql = require('mssql');
const db = require('../startup/db');

async function insertUserAccess(staff, menu, subMenu) {
	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			.input('staff', sql.Int, staff)
			.input('menu', sql.Int, menu)
			.input('subMenu', sql.Int, subMenu)
			.execute('uspInsertUserAccess');
		//console.log(Role);
		return User.recordset;
	} catch (error) {
		console.log(error);
	}
}

async function UpdateUserRole(id, role) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('id', sql.Int, id)
			.input('role', sql.NVarChar, role)
			.execute('uspUpdateUserRole');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function deleteUserRole(id) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('id', sql.Int, id)
			.execute('uspDeleteUserRole');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getAllRole() {
	try {
		let pool = await sql.connect(db);
		let Role = await pool.request().execute('uspGetUserRoles');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

const getUserMenus = async (staff) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('user', sql.Int, staff)
			.execute('uspGetUserMenus');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};
const getUserAccess = async (staff, mId) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('user', sql.Int, staff)
			.input('mId', sql.Int, mId)
			.execute('uspGetUserAccess');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

async function getRoleAccess(role) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('role', sql.Int, role)
			.execute('uspGetRoleAccess');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function deleteUserAccess(id) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('id', sql.Int, id)
			.execute('uspDeleteUserAccess');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	insertUserAccess,
	//getAllUserRoles,
	getUserAccess,
	UpdateUserRole,
	deleteUserRole,
	//insertRoleAccess,
	getRoleAccess,
	deleteUserAccess,
	getUserMenus,
};

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
