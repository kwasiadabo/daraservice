const sql = require('mssql')
const db = require('../startup/db')

async function insertIntoVault(Cr, narration, tdate) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('Cr', sql.Money, Cr)
      .input('narration', sql.NVarChar, narration)
      .input('tdate', sql.NVarChar, tdate)
      .execute('uspInsertIntoVault')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCheckVaultTransfer(tdate) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .execute('uspCheckVaultTransfer')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getVaultBal() {
  try {
    let pool = await sql.connect(db)
    let Bal = await pool.request().execute('uspGetVaultBalance')
    return Bal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getVault() {
  try {
    let pool = await sql.connect(db)
    let Bal = await pool.request().execute('uspGetVault')
    return Bal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDeleteFromVault(id) {
  try {
    let pool = await sql.connect(db)
    let Bal = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteFromVault')
    return Bal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function approveVaultEntry(id) {
  try {
    let pool = await sql.connect(db)
    let Bal = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspApproveVaultEntry')
    return Bal.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertIntoVault,
  getCheckVaultTransfer,
  getVaultBal,
  getVault,
  getDeleteFromVault,
  approveVaultEntry,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
