const sql = require('mssql')
const db = require('../startup/db')

async function insertBankDeposit(
  tdate,
  cr,
  narration,
  bank,
  accountNo,
  userId,
) {
  try {
    let pool = await sql.connect(db)
    let Deposit = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .input('Cr', sql.Money, cr)
      .input('narration', sql.NVarChar, narration)
      .input('bank', sql.Int, bank)
      .input('accountNo', sql.Int, accountNo)
      .input('userId', sql.NVarChar, userId)
      .execute('uspInsertIntoBankTrans')
    return Deposit.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertBankOpeningBal(
  tdate,
  cr,
  narration,
  bank,
  accountNo,
  userId,
) {
  try {
    let pool = await sql.connect(db)
    let Deposit = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .input('Cr', sql.Money, cr)
      .input('narration', sql.NVarChar, narration)
      .input('bank', sql.Int, bank)
      .input('accountNo', sql.Int, accountNo)
      .input('userId', sql.NVarChar, userId)
      .execute('uspInsertBankOpeningBal')
    return Deposit.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function approveBankDeposit(
  tdate,
  cr,
  narration,
  bank,
  accountNo,
  userId,
  approvedBy,
  id,
) {
  try {
    let pool = await sql.connect(db)
    let Deposit = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .input('Cr', sql.Money, cr)
      .input('narration', sql.NVarChar, narration)
      .input('bank', sql.Int, bank)
      .input('accountNo', sql.Int, accountNo)
      .input('userId', sql.NVarChar, userId)
      .input('approvedBy', sql.Int, approvedBy)
      .input('id', sql.Int, id)
      .execute('uspApproveBankDeposit')
    return Deposit.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteBankDeposit(id) {
  try {
    let pool = await sql.connect(db)
    let Deposit = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteBankDeposit')
    return Deposit.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDeposits(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Deposits = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetBankDeposits')
    return Deposits.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getOpeningBal() {
  try {
    let pool = await sql.connect(db)
    let Deposits = await pool.request().execute('uspGetOpeningBalances')
    return Deposits.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getUnApproveDeposits() {
  try {
    let pool = await sql.connect(db)
    let Deposits = await pool.request().execute('uspGetUnApprovedBankDeposits')
    return Deposits.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getApproveDeposits(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Deposits = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetApprovedBankDeposits')
    return Deposits.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertBankDeposit,
  getDeposits,
  deleteBankDeposit,
  getUnApproveDeposits,
  approveBankDeposit,
  getApproveDeposits,
  insertBankOpeningBal,
  getOpeningBal,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
