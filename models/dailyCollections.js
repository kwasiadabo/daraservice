const sql = require('mssql')
const db = require('../startup/db')

async function insertDailyCollections(
  dateOfCollection,
  officer,
  customer,
  modeOfPayment,
  amount,
) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .input('officer', sql.Int, officer)
      .input('customer', sql.Int, customer)
      .input('modeOfPayment', sql.NVarChar, modeOfPayment)
      .input('amount', sql.Money, amount)
      .execute('uspInsertIntoDailyCollections')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function correctDailyCollections(id, amount) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('id', sql.Int, id)
      .input('amount', sql.Money, amount)
      .execute('uspCorrectDailyCollection')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDailyCollections(dateOfCollection, Officer) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .input('officer', sql.Int, Officer)
      .execute('uspGetDailyCollections')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getTotalDailyCollections(dateOfCollection, Officer) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .input('officer', sql.Int, Officer)
      .execute('uspGetTotalDailyCollections')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getActiveLoanCustomers(Staff) {
  try {
    let pool = await sql.connect(db)
    let ActiveCustomers = await pool
      .request()
      .input('Staff', sql.Int, Staff)
      .execute('uspGetActiveLoanCustomers')
    return ActiveCustomers.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCustomerLoanBalance(customer) {
  try {
    let pool = await sql.connect(db)
    let CustomerBal = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspGetCustomerLoanBalance')
    return CustomerBal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteDailyCollections(id) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspDeleteDailyCollectionsEntry')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function creditCustomers(officer, dateOfCollection) {
  try {
    let pool = await sql.connect(db)
    let DailyCollections = await pool
      .request()
      .input('officer', sql.Int, officer)
      .input('tdate', sql.Date, dateOfCollection)
      .execute('uspInsertLoanRepayment')
    return DailyCollections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCollectionSheet(Officer, collectionDate) {
  try {
    let pool = await sql.connect(db)
    let CollectionSheet = await pool
      .request()
      .input('Officer', sql.Int, Officer)
      .input('collectionDate', sql.Date, collectionDate)
      .execute('rptCollectionSheet')
    return CollectionSheet.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function expectedCollections() {
  try {
    let pool = await sql.connect(db)
    let Collections = await pool.request().execute('uspExpectedCollections')
    return Collections.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function defaulters() {
  try {
    let pool = await sql.connect(db)
    let Defaulters = await pool.request().execute('uspCountDefaulters')
    return Defaulters.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function activeLoans() {
  try {
    let pool = await sql.connect(db)
    let Active = await pool.request().execute('uspActiveLoans')
    return Active.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDailyCollectionsForCorrection(dateOfCollection) {
  try {
    let pool = await sql.connect(db)
    let Active = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .execute('uspGetAllDailyCollections')
    return Active.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertDailyCollections,
  getDailyCollections,
  getTotalDailyCollections,
  getActiveLoanCustomers,
  getCustomerLoanBalance,
  deleteDailyCollections,
  creditCustomers,
  getCollectionSheet,
  expectedCollections,
  defaulters,
  activeLoans,
  getDailyCollectionsForCorrection,
  correctDailyCollections,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
