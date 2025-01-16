const sql = require('mssql')
const db = require('../startup/db')

async function insertCashCollateral(
  customer,
  chequeId,
  amount,
  modeOfPayment,
  sending,
  receiving,
) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('chequeId', sql.Int, chequeId)
      .input('amount', sql.Money, amount)
      .input('modeOfPayment', sql.NVarChar, modeOfPayment)
      .input('sending', sql.NVarChar, sending)
      .input('receiving', sql.NVarChar, receiving)
      .execute('uspInsertCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function OffSetLoanWithCollateral(customer, Dr, narration, entryBy) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('Dr', sql.Money, Dr)
      .input('narration', sql.NVarChar, narration)
      .input('entryBy', sql.Int, entryBy)
      .execute('uspTransferCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCashCollateral() {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool.request().execute('uspGetCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCashCollateralHolders() {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool.request().execute('uspGetCollateralHolders')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteRegFee(id) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function withdrawCollateralCash(customer, amount, narration, entryBy) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('amount', sql.Money, amount)
      .input('narration', sql.NVarChar, narration)
      .input('entryBy', sql.Int, entryBy)
      .execute('uspWithdrawCollateralCash')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCollateralBal(customer) {
  try {
    let pool = await sql.connect(db)
    let collateralBal = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCollateralBal')
    return collateralBal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkCollateralExistence(customer, chequeId) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('chequeId', sql.Int, chequeId)
      .execute('uspCheckCollateralExistence')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateCashCollateral(id, amount) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('id', sql.Int, id)
      .input('amount', sql.Money, amount)
      .execute('uspUpdateCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCollateralWithdrawals(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let collateralBal = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetCollateralWithdrawals')
    return collateralBal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCollateralReceived(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let collateralBal = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptCollateral')
    return collateralBal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function reverseCollateralTransfer(id, idNumber, dr, narration, date) {
  try {
    let pool = await sql.connect(db)
    let CashCollateral = await pool
      .request()
      .input('id', sql.Int, id)
      .input('idNumber', sql.NVarChar, idNumber)
      .input('dr', sql.Money, dr)
      .input('narration', sql.NVarChar, narration)
      .input('date', sql.Date, date)
      .execute('uspReverseTransferCashCollateral')
    return CashCollateral.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertCashCollateral,
  getCashCollateral,
  getCashCollateralHolders,
  withdrawCollateralCash,
  getCollateralBal,
  checkCollateralExistence,
  updateCashCollateral,
  getCollateralWithdrawals,
  OffSetLoanWithCollateral,
  getCollateralReceived,
  reverseCollateralTransfer,
}
