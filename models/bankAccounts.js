const sql = require('mssql')
const db = require('../startup/db')

async function insertBankAccount(
  bank,
  branch,
  accountNumber,
  accountName,
  typeOfAccount,
) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('bank', sql.NVarChar, bank)
      .input('branch', sql.NVarChar, branch)
      .input('accountNumber', sql.NVarChar, accountNumber)
      .input('accountName', sql.NVarChar, accountName)
      .input('typeOfAccount', sql.NVarChar, typeOfAccount)
      .execute('uspInsertBankAccounts')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

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
}

async function getAllBankAccounts() {
  try {
    let pool = await sql.connect(db)
    let BankAccountResult = await pool.request().execute('uspGetBankAccounts')
    return BankAccountResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getBankAccount = async (bankAccountId) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('bankAccountId', sql.Int, bankAccountId)
      .execute('uspGetONEBankAccount')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getABankAccount = async (bank) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('bankId', sql.Int, bank)
      .execute('uspGetABankAccounts')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertBankAccount,
  getAllBankAccounts,
  getBankAccount,
  updateBankAccount,
  getABankAccount,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
