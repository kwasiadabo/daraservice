const sql = require('mssql')
const db = require('../startup/db')

async function insertExpensesItem(item) {
  try {
    let pool = await sql.connect(db)
    let ExpensesItem = await pool
      .request()
      .input('item', sql.NVarChar, item)

      .execute('uspInsertExpensesItem')
    return ExpensesItem.recordsets
  } catch (error) {
    console.log(error)
  }
}
/*
async function updateBankAccount(
  id,
  bank,
  branch,
  accountNumber,
  accountName,
  typeOfAccount,
) {
  try {
    let pool = await sql.connect(db)
    let BankAccountResult = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('bank', sql.NVarChar, bank)
      .input('branch', sql.NVarChar, branch)
      .input('accountNumber', sql.NVarChar, accountNumber)
      .input('accountName', sql.NVarChar, accountName)
      .input('typeOfAccount', sql.NVarChar, typeOfAccount)
      .execute('uspUpdateBankAccounts')
    return BankAccountResult.recordsets
  } catch (error) {
    console.log(error)
  }
}*/

async function getExpensesItems() {
  try {
    let pool = await sql.connect(db)
    let ExpensesItems = await pool.request().execute('uspGetExpensesItems')
    return ExpensesItems.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertExpensesItem,
  getExpensesItems,
}
