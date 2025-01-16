const sql = require('mssql');
const db = require('../startup/db');

async function insertUserRole(role, access) {
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

async function insertRoleAccess(role, menu, subMenu) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('role', sql.Int, role)
			.input('menu', sql.NVarChar, menu)
			.input('subMenu', sql.NVarChar, subMenu)
			.execute('uspSaveRoleAccess');
		console.log(Role);
		return Role.recordset;
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

async function getRoleAccess(mId) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('mId', sql.Int, mId)
			.execute('uspGetRoleAccess');
		return Role.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function getRoleMenus(role) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('role', sql.Int, role)
			.execute('uspGetRoleMenus');
		return Role.recordsets[0];
	} catch (error) {
		console.log(error);
	}
}

async function deleteRoleAccess(id) {
	try {
		let pool = await sql.connect(db);
		let Role = await pool
			.request()
			.input('id', sql.Int, id)
			.execute('uspDeleteRoleAccess');
		return Role.recordsets;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	insertUserRole,
	//getAllUserRoles,
	getUserRole,
	UpdateUserRole,
	deleteUserRole,
	insertRoleAccess,
	getRoleAccess,
	deleteRoleAccess,
	getRoleMenus,
};

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
