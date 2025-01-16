const sql = require('mssql')
const db = require('../startup/db')

async function insertEndDay(Cr, narration, tdate) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('Cr', sql.Money, Cr)
      .input('narration', sql.NVarChar, narration)
      .input('tdate', sql.NVarChar, tdate)
      .execute('uspEndDay')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoanCollections(dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspGetDaysLoansCollection')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCashCollateralCollections(dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspGetDaysCollateralCollection')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getRegistrationCollections(dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspGetDaysRegistrationCollection')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDaysExpenses(dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspGetDaysExpenses')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDaysProcessingFee(tdate) {
  try {
    let pool = await sql.connect(db)
    let ProcessingFee = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .execute('uspGetProcessingFee')
    return ProcessingFee.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getLoanCollections,
  getCashCollateralCollections,
  getRegistrationCollections,
  getDaysExpenses,
  getDaysProcessingFee,
  insertEndDay,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
