const sql = require('mssql')
const db = require('../startup/db')

async function insertAssociation(association) {
  try {
    let pool = await sql.connect(db)
    let AssociationResult = await pool
      .request()
      .input('association', sql.NVarChar, association)

      .execute('uspInsertAssociation')
    return AssociationResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllAssociations() {
  try {
    let pool = await sql.connect(db)
    let associationsResult = await pool.request().execute('uspGetAssociations')
    return associationsResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getAssociation = async (association) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('association', sql.NVarChar, association)
      //.input("Password", sql.NVarChar, req)
      .execute('uspGetAssociation')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertAssociation,
  getAllAssociations,
  getAssociation,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
