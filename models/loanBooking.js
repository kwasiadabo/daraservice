const sql = require('mssql')
const db = require('../startup/db')

async function insertLoanBooking(
  customer,
  product,
  principal,
  cashCollateral,
  assetCollateral,
  purpose,
  firstGuarantor,
  firstGuarantorPhone,
  firstGuarantorGPS,
  firstGuarantorBusiness,
  firstGuarantorIdType,
  firstGuarantorIdNumber,
  firstGuarantorRelationship,
  firstGuarantorHouseHold,
  firstGuarantorHouseHoldPhone,
  businessName,
  yearsInBusiness,
  addressOfBusiness,
  phoneOfBusiness,
  dailySales,
  banks,
  bankLocation,
  businessPartner,
  estimatedAssetsValue,
  typeOfStructure,
  directionsToResidence,
  directionsToBusiness,
  secondGuarantor,
  secondGuarantorPhone,
  secondGuarantorGPS,
  secondGuarantorBusiness,
  secondGuarantorIdType,
  secondGuarantorIdNumber,
  secondGuarantorRelationship,
  secondGuarantorHouseHold,
  secondGuarantorHouseHoldPhone,
  disbursementId,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('product', sql.Int, product)
      .input('principal', sql.Money, principal)
      .input('cashCollateral', sql.Money, cashCollateral)
      .input('assetCollateral', sql.NVarChar, customer)
      .input('purpose', sql.NVarChar, purpose)
      .input('firstGuarantor', sql.NVarChar, firstGuarantor)
      .input('firstGuarantorPhone', sql.NVarChar, firstGuarantorPhone)
      .input('firstGuarantorGPS', sql.NVarChar, firstGuarantorGPS)
      .input('firstGuarantorBusiness', sql.NVarChar, firstGuarantorBusiness)
      .input('firstGuarantorIdType', sql.NVarChar, firstGuarantorIdType)
      .input('firstGuarantorIdNumber', sql.NVarChar, firstGuarantorIdNumber)
      .input(
        'firstGuarantorRelationship',
        sql.NVarChar,
        firstGuarantorRelationship,
      )
      .input(
        'firstGuarantorHouseHoldPerson',
        sql.NVarChar,
        firstGuarantorHouseHold,
      )
      .input(
        'firstGuarantorHouseHoldPhone',
        sql.NVarChar,
        firstGuarantorHouseHoldPhone,
      )

      .input('secondGuarantor', sql.NVarChar, secondGuarantor)
      .input('secondGuarantorPhone', sql.NVarChar, secondGuarantorPhone)
      .input('secondGuarantorGPS', sql.NVarChar, secondGuarantorGPS)
      .input('secondGuarantorBusiness', sql.NVarChar, secondGuarantorBusiness)
      .input('secondGuarantorIdType', sql.NVarChar, secondGuarantorIdType)
      .input('secondGuarantorIdNumber', sql.NVarChar, secondGuarantorIdNumber)
      .input(
        'secondGuarantorRelationship',
        sql.NVarChar,
        secondGuarantorRelationship,
      )
      .input(
        'secondGuarantorHouseHoldPerson',
        sql.NVarChar,
        secondGuarantorHouseHold,
      )
      .input(
        'secondGuarantorHouseHoldPhone',
        sql.NVarChar,
        secondGuarantorHouseHoldPhone,
      )

      .input('businessName', sql.NVarChar, businessName)
      .input('yearsInBusiness', sql.NVarChar, yearsInBusiness)
      .input('addressOfBusiness', sql.NVarChar, addressOfBusiness)
      .input('phoneOfBusiness', sql.NVarChar, phoneOfBusiness)
      .input('dailySales', sql.Money, dailySales)
      .input('banks', sql.NVarChar, banks)
      .input('bankLocation', sql.NVarChar, bankLocation)
      .input('businessPartner', sql.NVarChar, businessPartner)
      .input('estimatedAssetsValue', sql.Money, estimatedAssetsValue)
      .input('typeOfStructure', sql.NVarChar, typeOfStructure)
      .input('directionsToResidence', sql.NVarChar, directionsToResidence)
      .input('directionsToBusiness', sql.NVarChar, directionsToBusiness)
      .input('disbursementId', sql.Int, disbursementId)
      .execute('uspInsertLoanBooking')
    return LoanBooking.recordsets
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

async function completeLoanBooking(
  customer,
  disbursementId,
  period,
  interestRate,
  dateOfBooking,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('period', sql.Int, period)
      .input('interestRate', sql.Int, interestRate)
      .input('dateOfBooking', sql.Date, dateOfBooking)
      .execute('uspCompleteLoanBooking')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoanBooking(customer, disbursementId) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .execute('uspGetLoanBooking')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoanBookingSummary(customer, disbursementId) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .execute('uspGetSummaryOfBooking')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertProductIntoLoanBooking(
  customer,
  product,
  disbursementId,
  cashCollateral,
  interestRate,
  frequency,
  duration,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('product', sql.Int, product)
      .input('disbursementId', sql.Int, disbursementId)
      .input('cashCollateral', sql.Money, cashCollateral)
      .input('interestRate', sql.Float, interestRate)
      .input('frequency', sql.NVarChar, frequency)
      .input('duration', sql.Int, duration)
      .execute('uspInsertProductIntoLoanBooking')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertPrincipalIntoLoanBooking(
  customer,
  principal,
  purpose,
  disbursementId,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('principal', sql.Money, principal)
      .input('purpose', sql.NVarChar, purpose)
      .input('disbursementId', sql.Int, disbursementId)
      .execute('uspInsertPrincipalIntoLoanBooking')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertFirstGuarantor(
  customer,
  disbursementId,
  firstGuarantorName,
  firstGuarantorGpsAddress,
  firstGuarantorPhone,
  firstGuarantorBusiness,
  firstGuarantorIdType,
  firstGuarantorIdNumber,
  firstGuarantorRelationship,
  firstGuarantorHouseholdPerson,
  firstGuarantorHouseholdPersonPhone,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('firstGuarantorName', sql.NVarChar, firstGuarantorName)
      .input('firstGuarantorGpsAddress', sql.NVarChar, firstGuarantorGpsAddress)
      .input('firstGuarantorPhone', sql.NVarChar, firstGuarantorPhone)
      .input('firstGuarantorBusiness', sql.NVarChar, firstGuarantorBusiness)
      .input('firstGuarantorIdType', sql.NVarChar, firstGuarantorIdType)
      .input('firstGuarantorIdNumber', sql.NVarChar, firstGuarantorIdNumber)
      .input(
        'firstGuarantorRelationship',
        sql.NVarChar,
        firstGuarantorRelationship,
      )
      .input(
        'firstGuarantorHouseholdPerson',
        sql.NVarChar,
        firstGuarantorHouseholdPerson,
      )
      .input(
        'firstGuarantorHouseholdPersonPhone',
        sql.NVarChar,
        firstGuarantorHouseholdPersonPhone,
      )
      .execute('uspInsertFirstGuarantor')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertSecondGuarantor(
  customer,
  disbursementId,
  secondGuarantorName,
  secondGuarantorGpsAddress,
  secondGuarantorPhone,
  secondGuarantorBusiness,
  secondGuarantorIdType,
  secondGuarantorIdNumber,
  secondGuarantorRelationship,
  secondGuarantorHouseholdPerson,
  secondGuarantorHouseholdPersonPhone,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('secondGuarantorName', sql.NVarChar, secondGuarantorName)
      .input(
        'secondGuarantorGpsAddress',
        sql.NVarChar,
        secondGuarantorGpsAddress,
      )
      .input('secondGuarantorPhone', sql.NVarChar, secondGuarantorPhone)
      .input('secondGuarantorBusiness', sql.NVarChar, secondGuarantorBusiness)
      .input('secondGuarantorIdType', sql.NVarChar, secondGuarantorIdType)
      .input('secondGuarantorIdNumber', sql.NVarChar, secondGuarantorIdNumber)
      .input(
        'secondGuarantorRelationship',
        sql.NVarChar,
        secondGuarantorRelationship,
      )
      .input(
        'secondGuarantorHouseholdPerson',
        sql.NVarChar,
        secondGuarantorHouseholdPerson,
      )
      .input(
        'secondGuarantorHouseholdPersonPhone',
        sql.NVarChar,
        secondGuarantorHouseholdPersonPhone,
      )
      .execute('uspInsertSecondGuarantor')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertBusinessDetails(
  customer,
  disbursementId,
  businessName,
  yearsInBusiness,
  addressOfBusiness,
  phoneOfBusiness,
  dailySales,
  bank,
  bankLocation,
  businessPartner,
  estimatedAssetValue,
  typeOfStructure,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('businessName', sql.NVarChar, businessName)
      .input('yearsInBusiness', sql.NVarChar, yearsInBusiness)
      .input('addressOfBusiness', sql.NVarChar, addressOfBusiness)
      .input('phoneOfBusiness', sql.NVarChar, phoneOfBusiness)
      .input('dailySales', sql.Money, dailySales)
      .input('bank', sql.NVarChar, bank)
      .input('bankLocation', sql.NVarChar, bankLocation)
      .input('businessPartner', sql.NVarChar, businessPartner)
      .input('estimatedAssetValue', sql.Money, estimatedAssetValue)
      .input('typeOfStructure', sql.NVarChar, typeOfStructure)
      .execute('uspInsertBusinessDetails')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function insertDirections(
  customer,
  disbursementId,
  directionsToResidence,
  directionsToBusiness,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('directionsToResidence', sql.NVarChar, directionsToResidence)
      .input('directionsToBusiness', sql.NVarChar, directionsToBusiness)
      .execute('uspInsertDirections')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkProductExistence(customer) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCheckProductBooking')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkPrincipalExistence(customer) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCheckPrincipalBooking')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function deleteLoanBooking(id) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('uspRemoveBooking')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkFirstGuarantorExistence(customer) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCheckFirstGuarantorBooking')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkSecondGuarantorExistence(customer) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .execute('uspCheckSecondGuarantorBooking')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getPaymentSchedule(disbursementid, customer) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('disbursementId', sql.Int, disbursementid)
      .input('customer', sql.Int, customer)
      .execute('uspGetPaymentSchedule')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function LoanBookingsReport(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let LoanBookings = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('rptViewLoanBookings')
    return LoanBookings.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function viewLoanBookings() {
  try {
    let pool = await sql.connect(db)
    let LoanBookings = await pool.request().execute('uspViewLoanBookings')
    return LoanBookings.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoansBooked() {
  try {
    let pool = await sql.connect(db)
    let LoanBookings = await pool.request().execute('getLoansBooked')
    return LoanBookings.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoanBookedDetails(bookingId) {
  try {
    let pool = await sql.connect(db)
    let LoanBookings = await pool
      .request()
      .input('loanId', sql.Int, bookingId)
      .execute('rptBookedLoanDetails')
    return LoanBookings.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function checkEntriesBeforeSummary(customer, disbursementid) {
  try {
    let pool = await sql.connect(db)
    let Booking = await pool
      .request()
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementid)
      .execute('uspCheckEntriesBeforeSummary')
    return Booking.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getLoansForReschedule(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let LoanBookings = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetBookedLoansForRescheduling')
    return LoanBookings.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function rescheduleLoanBooking(
  dateCompleted,
  duration,
  customer,
  disbursementId,
  bookingId,
  chequeId,
  amount,
  interestRate,
  frequency,
) {
  try {
    let pool = await sql.connect(db)
    let LoanBooking = await pool
      .request()
      .input('dateCompleted', sql.Date, dateCompleted)
      .input('duration', sql.Int, duration)
      .input('customer', sql.Int, customer)
      .input('disbursementId', sql.Int, disbursementId)
      .input('bookingId', sql.Int, bookingId)
      .input('chequeId', sql.Int, chequeId)
      .input('amount', sql.Money, amount)
      .input('interestRate', sql.Float, interestRate)
      .input('frequency', sql.NVarChar, frequency)

      .execute('uspRescheduleLoan')
    return LoanBooking.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertLoanBooking,
  getCashCollateral,
  getLoanBooking,
  insertProductIntoLoanBooking,
  insertPrincipalIntoLoanBooking,
  insertFirstGuarantor,
  insertSecondGuarantor,
  insertBusinessDetails,
  insertDirections,
  getLoanBookingSummary,
  completeLoanBooking,
  viewLoanBookings,
  checkProductExistence,
  checkPrincipalExistence,
  checkFirstGuarantorExistence,
  checkSecondGuarantorExistence,
  getPaymentSchedule,
  checkEntriesBeforeSummary,
  LoanBookingsReport,
  deleteLoanBooking,
  getLoansBooked,
  getLoanBookedDetails,
  getLoansForReschedule,
  rescheduleLoanBooking,
}
