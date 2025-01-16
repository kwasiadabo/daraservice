const sql = require('mssql')
const db = require('../startup/db')

async function insertBank(bank) {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool
      .request()
      .input('bank', sql.NVarChar, bank)
      .execute('uspInsertBanks')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateBank(id, bank) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('bank', sql.NVarChar, bank)
      .execute('uspUpdateBank')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteBank(id) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteBank')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllBanks() {
  try {
    let pool = await sql.connect(db)
    let BankResult = await pool.request().execute('uspGetBanks')
    return BankResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getBank = async (bankId) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('bankId', sql.Int, bankId)
      .execute('uspGetONEBank')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertBank,
  getAllBanks,
  getBank,
  updateBank,
  deleteBank,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
