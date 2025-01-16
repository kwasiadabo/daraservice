const sql = require('mssql');

const db = {
	//server: '192.168.8.2',
	//port: 1433,

	//DCCL
	//DCCL
	server: 'SQL8006.site4now.net',
	//port: 1433,

	user: 'db_aa95d7_daraplus_admin',
	password: 'Kaw3se4dr5$$1',
	database: 'db_aa95d7_daraplus',

	// server: '192.168.8.127',
	// port: 1433,
	// user: 'sa',
	// password: '19 dec',
	// database: 'DARAPLUS',
	options: {
		encrypt: false,
		// enableArithAbort: true,
		trustServerCertificate: true,
		cryptoCredentialsDetails: {
			minVersion: 'TLSv1',
		},
	},
	pool: { max: 10, min: 0, idleTimeoutMillis: 60000 },
};

sql.on('error', (err) => {
	console.log(err.message);
});

module.exports = db;
