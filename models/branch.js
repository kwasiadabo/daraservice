const sql = require('mssql')
const db = require('../startup/db')

async function insertBranch(branch, location, gps, phone) {
  try {
    let pool = await sql.connect(db)
    let BranchResults = await pool
      .request()
      .input('branch', sql.NVarChar, branch)
      .input('location', sql.NVarChar, location)
      .input('gps', sql.NVarChar, gps)
      .input('phone', sql.NVarChar, phone)
      .execute('uspInsertBranch')
    return BranchResults.recordsets
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

async function getBranches() {
  try {
    let pool = await sql.connect(db)
    let Branches = await pool.request().execute('uspGetBranches')
    return Branches.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateBranch(id, branch, location, gps, phone) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('branch', sql.NVarChar, branch)
      .input('location', sql.NVarChar, location)
      .input('GPS', sql.NVarChar, gps)
      .input('phone', sql.NVarChar, phone)
      .execute('uspUpdateBranches')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteBranch(id) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteBranches')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertBranch,
  getBranches,
  updateBranch,
  deleteBranch,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
