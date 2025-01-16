const sql = require('mssql')
const db = require('../startup/db')

async function insertRegistrationFee(
  customer,
  chequeId,
  amount,
  modeOfPayment,
  sending,
  receiving,
) {
  try {
    let pool = await sql.connect(db)
    let RegFee = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('chequeId', sql.Int, chequeId)
      .input('amount', sql.Money, amount)
      .input('modeOfPayment', sql.NVarChar, modeOfPayment)
      .input('sending', sql.NVarChar, sending)
      .input('receiving', sql.NVarChar, receiving)
      .execute('uspInsertRegFee')
    return RegFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateRegistrationFee(id, amount) {
  try {
    let pool = await sql.connect(db)
    let RegFee = await pool
      .request()
      .input('id', sql.Int, id)
      .input('amount', sql.Money, amount)
      .execute('uspUpdateRegistrationFee')
    return RegFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getRegFee() {
  try {
    let pool = await sql.connect(db)
    let RegFee = await pool.request().execute('uspGetRegistrationFee')
    return RegFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkRegFeeExistence(customer, chequeId) {
  try {
    let pool = await sql.connect(db)
    let RegFee = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('chequeId', sql.Int, chequeId)
      .execute('uspCheckRegFeeExistence')
    return RegFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteRegFee(id) {
  try {
    let pool = await sql.connect(db)
    let RegFee = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteRegFee')
    return RegFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertRegistrationFee,
  getRegFee,
  checkRegFeeExistence,
  updateRegistrationFee,
  deleteRegFee,
}
