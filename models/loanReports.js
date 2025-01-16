const sql = require('mssql')
const db = require('../startup/db')

async function loansInArrears(officer) {
  try {
    let pool = await sql.connect(db)
    let Arrears = await pool
      .request()
      .input('staff', sql.Int, officer)
      .execute('rptCorrectLoanInArrears')
    return Arrears.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function loansDisbursed(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Arrears = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptLoansDisbursed')
    return Arrears.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function issuedCheques(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Cheques = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptIssuedCheques')
    return Cheques.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function activeLoans() {
  try {
    let pool = await sql.connect(db)
    let Cheques = await pool.request().execute('rptActiveLoans')
    return Cheques.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function loanBalances() {
  try {
    let pool = await sql.connect(db)
    let Balances = await pool.request().execute('rptLoanBalances')
    return Balances.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function collateralBalances() {
  try {
    let pool = await sql.connect(db)
    let Balances = await pool.request().execute('rptCollateralBalances')
    return Balances.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function paymentsDue(pDate) {
  try {
    let pool = await sql.connect(db)
    let PaymentsDue = await pool
      .request()
      .input('date', sql.Date, pDate)
      .execute('rptPaymentsDue')
    return PaymentsDue.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getCustomerLoans(customer) {
  try {
    let pool = await sql.connect(db)
    let CustomerLoans = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspGetCustomerLoans')
    return CustomerLoans.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDailyEntryReport(officer, dateOfCollection) {
  try {
    let pool = await sql.connect(db)
    let DailyEntry = await pool
      .request()
      .input('officer', sql.Int, officer)
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .execute('rptDailyEntry')
    return DailyEntry.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getEndOfDaySummary(dateOfCollection) {
  try {
    let pool = await sql.connect(db)
    let EndOfDay = await pool
      .request()
      .input('dateOfCollection', sql.Date, dateOfCollection)
      .execute('rptEndOfDaySummary')
    return EndOfDay.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getBankStatement(startDate, endDate, bank, accountNumber) {
  try {
    let pool = await sql.connect(db)
    let EndOfDay = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .input('bank', sql.Int, bank)
      .input('account', sql.Int, accountNumber)
      .execute('rptBankStatement')
    return EndOfDay.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getVaultStatement(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let EndOfDay = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptVaultStatement')
    return EndOfDay.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getExpectedPayments() {
  try {
    let pool = await sql.connect(db)
    let Expected = await pool.request().execute('rptExpectedPayments')
    return Expected.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoanInArrears(officer) {
  try {
    let pool = await sql.connect(db)
    let Expected = await pool
      .request()
      .input('officer', sql.NVarChar, officer)
      .execute('rptCorrectLoanInArrears')
    return Expected.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getDefaulters() {
  try {
    let pool = await sql.connect(db)
    let Defaulters = await pool.request().execute('rptDefaulters')
    return Defaulters.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoansDisbursedPerOfficer(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Loans = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptLoansDisbursedPerOfficer')
    return Loans.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getOfficerLoansDisbursed(startDate, endDate, officer) {
  try {
    let pool = await sql.connect(db)
    let Loans = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .input('officer', sql.Int, officer)
      .execute('rptOfficerLoansDisbursed')
    return Loans.recordsets
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getDefaulters,
  getExpectedPayments,
  loansInArrears,
  loansDisbursed,
  issuedCheques,
  activeLoans,
  loanBalances,
  paymentsDue,
  getCustomerLoans,
  collateralBalances,
  getDailyEntryReport,
  getEndOfDaySummary,
  getBankStatement,
  getVaultStatement,
  getLoanInArrears,
  getLoansDisbursedPerOfficer,
  getOfficerLoansDisbursed,
}
