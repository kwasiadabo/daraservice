const sql = require('mssql')
const db = require('../startup/db')

async function insertDisbursement(chequeId, disbursedBy, customer, amount) {
  try {
    let pool = await sql.connect(db)
    let DisbursementResult = await pool
      .request()
      .input('chequeId', sql.Int, chequeId)
      .input('disbursedBy', sql.Int, disbursedBy)
      .input('customer', sql.Int, customer)
      .input('amount', sql.Int, amount)
      .execute('uspInsertDisbursement')
    return DisbursementResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllDisbursement(startdate, enddate) {
  try {
    let pool = await sql.connect(db)
    let DisbursementResult = await pool
      .request()
      .input('startdate', sql.Date, startdate)
      .input('enddate', sql.Date, enddate)
      .execute('uspGetDisbursedCheques')
    return DisbursementResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getUnbookedCheques() {
  try {
    let pool = await sql.connect(db)
    let DisbursementResult = await pool
      .request()
      .execute('uspGetUnbookedCheques')
    return DisbursementResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getDisbursement = async (association) => {
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
  insertDisbursement,
  getAllDisbursement,
  getDisbursement,
  getUnbookedCheques,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
