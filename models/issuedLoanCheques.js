const sql = require('mssql')
const db = require('../startup/db')

async function insertIssuedLoanCheque(
  nameOnCheque,
  bank,
  bankAccount,
  dateOnCheque,
  chequeNumber,
  amount,
  issuedBy,
  entryDate,
  status,
  bookingStatus,
) {
  try {
    let pool = await sql.connect(db)
    let IssuedLoanCheque = await pool
      .request()
      .input('nameOnCheque', sql.Int, nameOnCheque)
      .input('bank', sql.Int, bank)
      .input('bankAccount', sql.Int, bankAccount)
      .input('dateOnCheque', sql.Date, dateOnCheque)
      .input('chequeNumber', sql.NVarChar, chequeNumber)
      .input('amount', sql.Money, amount)
      .input('issuedBy', sql.Int, issuedBy)
      .input('entryDate', sql.Date, entryDate)
      .input('status', sql.NVarChar, status)
      .input('bookingStatus', sql.NVarChar, bookingStatus)
      .execute('uspInsertIssuedLoanCheques')
    return IssuedLoanCheque.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getIssuedLoanCheques(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let issuedLoanCheques = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetIssuedLoanCheques')
    return issuedLoanCheques.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getUndisburseCheques() {
  try {
    let pool = await sql.connect(db)
    let issuedLoanCheques = await pool
      .request()
      .execute('uspGetUndisbursedCheques')
    return issuedLoanCheques.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkActiveLoan(customer) {
  try {
    let pool = await sql.connect(db)
    let issuedLoanCheques = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCheckActiveLoan')
    return issuedLoanCheques.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteIssuedLoanCheque(id) {
  try {
    let pool = await sql.connect(db)
    let IssuedLoanCheque = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteIssuedLoanCheque')
    return IssuedLoanCheque.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertIssuedLoanCheque,
  getIssuedLoanCheques,
  getUndisburseCheques,
  deleteIssuedLoanCheque,
  checkActiveLoan,
}
