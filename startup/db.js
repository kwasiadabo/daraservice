const sql = require('mssql');

const db = {
	//server: '192.168.8.2',
	//port: 1433,

	//DCCL
	//DCCL
	//"Data Source=SQL5113.site4now.net;Initial Catalog=db_aa95d7_dccl;User Id=db_aa95d7_dccl_admin;Password=YOUR_DB_PASSWORD
	server: 'SQL5113.site4now.net',
	//port: 1433,

	user: 'db_aa95d7_dccl_admin',
	password: 'Kaw3se4dr5',
	database: 'db_aa95d7_dccl',

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
