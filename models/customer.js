const sql = require('mssql')
const db = require('../startup/db')

async function insertCustomers(
  fullName,
  dob,
  phone,
  hometown,
  placeOfBirth,
  occupation,
  nationality,
  gender,
  residentialAddress,
  ghanaPostGPS,
  directions,
  idType,
  idNumber,
  marritalStatus,
  nameOfSpouse,
  phoneOfSpouse,
  occupationOfSpouse,
  religion,
  placeOfWorship,
  leaderOfPlaceOfWorship,
  phoneOfPlaceOfWorship,
  assignedOfficer,
  association,
  img,
) {
  try {
    let pool = await sql.connect(db)
    let customerResult = await pool
      .request()
      .input('fullName', sql.NVarChar, fullName)
      .input('dob', sql.NVarChar, dob)
      .input('phone', sql.NVarChar, phone)
      .input('hometown', sql.NVarChar, hometown)
      .input('placeOfBirth', sql.NVarChar, placeOfBirth)
      .input('occupation', sql.NVarChar, occupation)
      .input('nationality', sql.NVarChar, nationality)
      .input('gender', sql.NVarChar, gender)
      .input('residentialAddress', sql.NVarChar, residentialAddress)
      .input('ghanaPostGPS', sql.NVarChar, ghanaPostGPS)
      .input('directions', sql.NVarChar, directions)
      .input('idType', sql.NVarChar, idType)
      .input('idNumber', sql.NVarChar, idNumber)
      .input('marritalStatus', sql.NVarChar, marritalStatus)
      .input('nameOfSpouse', sql.NVarChar, nameOfSpouse)
      .input('phoneOfSpouse', sql.NVarChar, phoneOfSpouse)
      .input('occupationOfSpouse', sql.NVarChar, occupationOfSpouse)
      .input('religion', sql.NVarChar, religion)
      .input('placeOfWorship', sql.NVarChar, placeOfWorship)
      .input('leaderOfPlaceOfWorship', sql.NVarChar, leaderOfPlaceOfWorship)
      .input('phoneOfPlaceOfWorship', sql.NVarChar, phoneOfPlaceOfWorship)
      .input('assignedOfficer', sql.Int, assignedOfficer)
      .input('association', sql.Int, association)
      .input('img', sql.Image, img)
      .execute('uspInsertCustomer')
    return customerResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateCustomers(
  id,
  fullName,
  hometown,
  dob,
  placeOfBirth,
  occupation,
  phone,
  nationality,
  gender,
  residentialAddress,
  ghanaPostGPS,
  directions,
  idType,
  idNumber,
  marritalStatus,
  nameOfSpouse,
  phoneOfSpouse,
  occupationOfSpouse,
  religion,
  placeOfWorship,
  leaderOfPlaceOfWorship,
  phoneOfPlaceOfWorship,
  assignedOfficer,
  association,
  img,
) {
  try {
    let pool = await sql.connect(db)
    let customerResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('gender', sql.NVarChar, gender)
      .input('fullName', sql.NVarChar, fullName)
      .input('hometown', sql.NVarChar, hometown)
      .input('dob', sql.Date, dob)
      .input('placeOfBirth', sql.NVarChar, placeOfBirth)
      .input('occupation', sql.NVarChar, occupation)
      .input('phone', sql.NVarChar, phone)
      .input('nationality', sql.NVarChar, nationality)

      .input('residentialAddress', sql.NVarChar, residentialAddress)
      .input('ghanaPostGPS', sql.NVarChar, ghanaPostGPS)
      .input('directions', sql.NVarChar, directions)
      .input('idType', sql.NVarChar, idType)
      .input('idNumber', sql.NVarChar, idNumber)
      .input('marritalStatus', sql.NVarChar, marritalStatus)
      .input('nameOfSpouse', sql.NVarChar, nameOfSpouse)
      .input('phoneOfSpouse', sql.NVarChar, phoneOfSpouse)
      .input('occupationOfSpouse', sql.NVarChar, occupationOfSpouse)
      .input('religion', sql.NVarChar, religion)
      .input('placeOfWorship', sql.NVarChar, placeOfWorship)
      .input('leaderOfPlaceOfWorship', sql.NVarChar, leaderOfPlaceOfWorship)
      .input('phoneOfPlaceOfWorship', sql.NVarChar, phoneOfPlaceOfWorship)
      .input('assignedOfficer', sql.Int, assignedOfficer)
      .input('association', sql.Int, association)
      .input('img', sql.Image, img)
      .execute('uspUpdateCustomer')
    return customerResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateCustomerWithoutImage(
  id,
  fullName,
  hometown,
  dob,
  placeOfBirth,
  occupation,
  phone,
  nationality,
  gender,
  residentialAddress,
  ghanaPostGPS,
  directions,
  idType,
  idNumber,
  marritalStatus,
  nameOfSpouse,
  phoneOfSpouse,
  occupationOfSpouse,
  religion,
  placeOfWorship,
  leaderOfPlaceOfWorship,
  phoneOfPlaceOfWorship,
  assignedOfficer,
  association,
) {
  try {
    let pool = await sql.connect(db)
    let customerR = await pool
      .request()
      .input('id', sql.Int, id)
      .input('gender', sql.NVarChar, gender)
      .input('fullName', sql.NVarChar, fullName)
      .input('hometown', sql.NVarChar, hometown)
      .input('dob', sql.Date, dob)
      .input('placeOfBirth', sql.NVarChar, placeOfBirth)
      .input('occupation', sql.NVarChar, occupation)
      .input('phone', sql.NVarChar, phone)
      .input('nationality', sql.NVarChar, nationality)

      .input('residentialAddress', sql.NVarChar, residentialAddress)
      .input('ghanaPostGPS', sql.NVarChar, ghanaPostGPS)
      .input('directions', sql.NVarChar, directions)
      .input('idType', sql.NVarChar, idType)
      .input('idNumber', sql.NVarChar, idNumber)
      .input('marritalStatus', sql.NVarChar, marritalStatus)
      .input('nameOfSpouse', sql.NVarChar, nameOfSpouse)
      .input('phoneOfSpouse', sql.NVarChar, phoneOfSpouse)
      .input('occupationOfSpouse', sql.NVarChar, occupationOfSpouse)
      .input('religion', sql.NVarChar, religion)
      .input('placeOfWorship', sql.NVarChar, placeOfWorship)
      .input('leaderOfPlaceOfWorship', sql.NVarChar, leaderOfPlaceOfWorship)
      .input('phoneOfPlaceOfWorship', sql.NVarChar, phoneOfPlaceOfWorship)
      .input('assignedOfficer', sql.Int, assignedOfficer)
      .input('association', sql.Int, association)
      .execute('uspUpdateCustomerWithoutImage')
    return customerR.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllCustomers() {
  try {
    let pool = await sql.connect(db)
    let customersResult = await pool.request().execute('uspGetCustomers')
    return customersResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

/*const getEmployees = async () => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      //.input("UserName", sql.NVarChar, req)
      //.input("Password", sql.NVarChar, req)
      .query('select * from employeeDetails')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}
*/
const getCustomer = async (id) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('id', sql.Int, id)
      .execute('rptViewIndividualCustomer')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getCustomerByOfficer = async (officer) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('officer', sql.Int, officer)
      .execute('uspGetcustomersByOfficer')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function reAssignCustomerToOfficer(officer, newOfficer, customer) {
  try {
    let pool = await sql.connect(db)
    let customerR = await pool
      .request()
      .input('currentOfficer', sql.Int, officer)
      .input('newOfficer', sql.Int, newOfficer)
      .input('customer', sql.Int, customer)
      .execute('uspRassignCustomers')
    return customerR.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function assignOfficer(officer, customer, reason) {
  try {
    let pool = await sql.connect(db)
    let customerR = await pool
      .request()
      .input('newOfficer', sql.Int, officer)
      .input('customer', sql.Int, customer)
      .input('reason', sql.NVarChar, reason)
      .execute('uspAssignOfficer')
    return customerR.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function customersCount() {
  try {
    let pool = await sql.connect(db)
    let customerR = await pool.request().execute('uspCustomersCount')
    return customerR.recordsets
  } catch (error) {
    console.log(error)
  }
}
async function Officers() {
  try {
    let pool = await sql.connect(db)
    let customerR = await pool.request().execute('uspOfficers')
    return customerR.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllCustomers,
  insertCustomers,
  updateCustomers,
  updateCustomerWithoutImage,
  getCustomer,
  Officers,
  getCustomerByOfficer,
  reAssignCustomerToOfficer,
  assignOfficer,
  customersCount,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
