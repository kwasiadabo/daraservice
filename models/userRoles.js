const sql = require('mssql');
const db = require('../startup/db');

async function insertUserRole(role) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('role', sql.NVarChar, role)
			.execute('uspInsertUserRole');
		return Role.recordsets;
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

async function getAllUserRoles() {
	try {
		let pool = await sql.connect(db);
		let Role = await pool.request().execute('uspGetUserRoles');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

const getUserRole = async (id) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('id', sql.Int, id)
			.execute('uspGetUserRole');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getMyAccess = async (staff) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('staff', sql.Int, staff)
			.execute('uspGetMyUserRoles');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getUserRoleMenus = async (role, staff) => {
	try {
		// Get the details of the user role
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('role', sql.Int, role)
			.input('staff', sql.Int, staff)
			.execute('uspGetRoleMenus');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	insertUserRole,
	getAllUserRoles,
	getUserRole,
	UpdateUserRole,
	deleteUserRole,
	getUserRoleMenus,
	getMyAccess,
};

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
