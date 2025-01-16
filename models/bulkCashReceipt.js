const sql = require('mssql')
const db = require('../startup/db')

async function insertBulkCashReceipt(
  dateOfReceipt,
  Officer,
  Cash,
  Momo,
  TotalAmount,
  Overage,
  Shortage,
  receivedBy,
) {
  try {
    let pool = await sql.connect(db)
    let BulkCashReceiptResults = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .input('Officer', sql.Int, Officer)
      .input('Cash', sql.Money, Cash)
      .input('Momo', sql.Money, Momo)
      .input('TotalAmount', sql.Money, TotalAmount)
      .input('Overage', sql.Money, Overage)
      .input('Shortage', sql.Money, Shortage)
      .input('receivedBy', sql.NVarChar, receivedBy)
      .execute('uspInsertBulkCashReceipts')
    return BulkCashReceiptResults.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateBulkCashReceipt(
  Id,
  dateOfReceipt,
  Officer,
  Cash,
  Momo,
  TotalAmount,
  Overage,
  Shortage,
) {
  try {
    let pool = await sql.connect(db)
    let BulkCashReceiptResults = await pool
      .request()
      .input('Id', sql.Int, Id)
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .input('Officer', sql.Int, Officer)
      .input('Cash', sql.Money, Cash)
      .input('Momo', sql.Money, Momo)
      .input('TotalAmount', sql.Money, TotalAmount)
      .input('Overage', sql.Money, Overage)
      .input('Shortage', sql.Money, Shortage)
      .execute('uspUpdateBulkCashReceipts')
    return BulkCashReceiptResults.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getBulkCashReceivedByDate(dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let BulkCashReceipt = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspGetBulkCashReceiptsByDate')
    return BulkCashReceipt.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getBulkCash = async () => {
  try {
    let pool = await sql.connect(db)
    let results = await pool.request().execute('uspGetBulkCash')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getBulkCashSubmitted = async (dateOfReceipt, officer) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .input('officer', sql.Int, officer)
      .execute('uspGetBulkCashSubmitted')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertDailyCollections(
  dateOfCollection,
  Officer,
  Customer,
  ModeOfPayment,
  Amount,
) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .input('Officer', sql.Int, Officer)
      .input('Customer', sql.Int, Customer)
      .input('ModeOfPayment', sql.NVarChar, ModeOfPayment)
      .input('Amount', sql.Money, Amount)

      .execute('uspInsertIntoDailyCollections')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteBulkCashCollection(id, officer, dateOfReceipt) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('id', sql.Int, id)
      .input('officer', sql.Int, officer)
      .input('dateOfReceipt', sql.Date, dateOfReceipt)
      .execute('uspDeleteBulkCollection')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertBulkCashReceipt,
  updateBulkCashReceipt,
  getBulkCashReceivedByDate,
  getBulkCash,
  getBulkCashSubmitted,
  insertDailyCollections,
  deleteBulkCashCollection,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
