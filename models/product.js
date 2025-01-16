const sql = require('mssql')
const db = require('../startup/db')

async function insertProduct(
  product,
  processingFee,
  frequency,
  interestRate,
  registrationFee,
  duration,
  cashCollateral,
  shortName,
) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('product', sql.NVarChar, product)
      .input('processingFee', sql.Float, processingFee)
      .input('frequency', sql.NVarChar, frequency)
      .input('interestRate', sql.Float, interestRate)
      .input('registrationFee', sql.Float, registrationFee)
      .input('duration', sql.Int, duration)
      .input('cashCollateral', sql.Float, cashCollateral)
      .input('shortName', sql.NVarChar, shortName)
      .execute('uspInsertProducts')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateProduct(
  id,
  product,
  processingFee,
  frequency,
  interestRate,
  registrationFee,
  duration,
  cashCollateral,
  shortName,
) {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('product', sql.NVarChar, product)
      .input('processingFee', sql.Float, processingFee)
      .input('frequency', sql.NVarChar, frequency)
      .input('interestRate', sql.Float, interestRate)
      .input('registrationFee', sql.Float, registrationFee)
      .input('duration', sql.Int, duration)
      .input('cashCollateral', sql.Float, cashCollateral)
      .input('shortName', sql.NVarChar, shortName)
      .execute('uspUpdateProducts')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllProducts() {
  try {
    let pool = await sql.connect(db)
    let ProductResult = await pool.request().execute('uspGetProducts')
    return ProductResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getProduct = async (productId) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('productId', sql.Int, productId)
      //.input("Password", sql.NVarChar, req)
      .execute('uspGetONEProduct')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertProduct,
  getAllProducts,
  getProduct,
  updateProduct,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
