const sql = require('mssql')
const db = require('../startup/db')

async function insertExpenses(
  expenseItem,
  modeOfPayment,
  narration,
  amount,
  madeBy,
  bank,
  accountNumber,
  sending,
  receiving,
  dateOnCheque,
  nameOnCheque,
  chequeNumber,
  tdate,
) {
  try {
    let pool = await sql.connect(db)
    let Expense = await pool
      .request()
      .input('expenseItem', sql.Int, expenseItem)
      .input('modeOfPayment', sql.NVarChar, modeOfPayment)
      .input('narration', sql.NVarChar, narration)
      .input('amount', sql.Money, amount)
      .input('madeBy', sql.Int, madeBy)
      .input('bank', sql.Int, bank)
      .input('accountNumber', sql.Int, accountNumber)
      .input('sending', sql.NVarChar, sending)
      .input('receiving', sql.NVarChar, receiving)
      .input('dateOnCheque', sql.NVarChar, dateOnCheque)
      .input('nameOnCheque', sql.NVarChar, nameOnCheque)
      .input('chequeNumber', sql.NVarChar, chequeNumber)
      .input('tdate', sql.Date, tdate)
      .execute('uspInsertExpenses')
    return Expense.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getExpenses(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Expenses = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetExpenses')
    return Expenses.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getUnapprovedExpenses(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Expenses = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetUnapprovedExpenses')
    return Expenses.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteExpenses(id) {
  try {
    let pool = await sql.connect(db)
    let Expense = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteExpenses')
    return Expense.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function approveExpenses(id) {
  try {
    let pool = await sql.connect(db)
    let Expense = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspApproveExpenses')
    return Expense.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getApprovedExpenses(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Expenses = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetApprovedExpenses')
    return Expenses.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertExpenses,
  getExpenses,
  deleteExpenses,
  getUnapprovedExpenses,
  approveExpenses,
  getApprovedExpenses,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
