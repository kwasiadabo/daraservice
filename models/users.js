const sql = require('mssql');
const db = require('../startup/db');
const bcrypt = require('bcrypt');
const { has } = require('config');

async function insertUser(username, password, staff, branch, userRole) {
	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hashSync(password, salt);
	//console.log(hash);
	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			.input('username', sql.NVarChar, username)
			.input('password', sql.NVarChar, hash)
			.input('staff', sql.Int, staff)
			.input('branch', sql.Int, branch)
			.input('userRole', sql.NVarChar, userRole)
			.execute('uspInsertUser');
		return User.recordsets;
	} catch (error) {
		console.log(error);
	}
}

async function getUserByUserPassword(username) {
	try {
		let pool = await sql.connect(db);
		let usersResult = await pool
			.request()
			.input('username', sql.NVarChar, username)
			.execute('uspGetUser');
		//console.log(usersResult.recordset[0]);
		return usersResult.recordset[0];
	} catch (error) {
		console.log(error);
	}
}

async function getUserAccounts() {
	try {
		let pool = await sql.connect(db);
		let usersResult = await pool.request().execute('uspGetUserAccounts');
		//console.log(usersResult.recordset[0]);
		return usersResult.recordset;
	} catch (error) {
		console.log(error);
	}
}

async function changePassword(id, password) {
	const salt = await bcrypt.genSalt(10);
	const hash = bcrypt.hashSync(password, salt);
	//console.log(password);
	//console.log(id);

	try {
		let pool = await sql.connect(db);
		let User = await pool
			.request()
			.input('id', sql.Int, id)
			.input('password', sql.NVarChar, hash)
			.execute('uspChangePassword');
		return User.recordsets;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getUserByUserPassword,
	insertUser,
	changePassword,
	getUserAccounts,
};
