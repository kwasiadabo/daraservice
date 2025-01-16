const sql = require('mssql')
const db = require('../startup/db')

async function doBackup(db) {
  try {
    let pool = await sql.connect(db)
    let backup = await pool
      .request()
      .input('name', sql.NVarChar, db)
      .execute('DBbackup')
    return backup.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  doBackup,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
