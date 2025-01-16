const sql = require('mssql')
const db = require('../startup/db')

async function insertInvestmentItem(item) {
  try {
    let pool = await sql.connect(db)
    let InvestmentItem = await pool
      .request()
      .input('item', sql.NVarChar, item)
      .execute('uspInsertInvestmentItem')
    return InvestmentItem.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateInvestmentItem(id, item) {
  try {
    let pool = await sql.connect(db)
    let InvestmentItem = await pool
      .request()
      .input('id', sql.Int, id)
      .input('item', sql.NVarChar, item)
      .execute('uspUpdateInvestmentItem')
    return InvestmentItem.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteInvestmentItem(id) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteInvestmentItem')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllInvestmentItems() {
  try {
    let pool = await sql.connect(db)
    let InvestmentItem = await pool.request().execute('uspGetInvestmentItems')
    return InvestmentItem.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertInvestmentItem,
  updateInvestmentItem,
  getAllInvestmentItems,
  deleteInvestmentItem,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
