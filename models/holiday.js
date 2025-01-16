const sql = require('mssql')
const db = require('../startup/db')

async function insertHoliday(holiday, hdate, year) {
  try {
    let pool = await sql.connect(db)
    let HolidayResult = await pool
      .request()
      .input('holiday', sql.NVarChar, holiday)
      .input('hdate', sql.Date, hdate)
      .input('year', sql.Int, year)

      .execute('uspInsertHolidays')
    return HolidayResult.recordsets
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

async function getYearHolidays(year) {
  try {
    let pool = await sql.connect(db)
    let YearHolidays = await pool
      .request()
      .input('year', sql.Int, year)
      .execute('uspGetYearHolidays')
    return YearHolidays.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateHoliday(id, holiday, hdate, year) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('holiday', sql.NVarChar, holiday)
      .input('hdate', sql.NVarChar, hdate)
      .input('year', sql.Int, year)

      .execute('uspUpdateHolidays')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteHoliday(id) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteHoliday')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertHoliday,
  getYearHolidays,
  updateHoliday,
  deleteHoliday,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
