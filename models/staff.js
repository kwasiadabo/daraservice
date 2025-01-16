const sql = require('mssql')
const db = require('../startup/db')

async function insertStaff(
  nameOfStaff,
  dob,
  dateEmployed,
  qualification,
  phone,
  guarantorOne,
  guarantorTwo,
  guarantorOnePhone,
  guarantorTwoPhone,
) {
  try {
    let pool = await sql.connect(db)
    let StaffResult = await pool
      .request()
      .input('nameOfStaff', sql.NVarChar, nameOfStaff)
      .input('dob', sql.NVarChar, dob)
      .input('dateEmployed', sql.NVarChar, dateEmployed)
      .input('qualification', sql.NVarChar, qualification)
      .input('phone', sql.NVarChar, phone)
      .input('guarantorOne', sql.NVarChar, guarantorOne)
      .input('guarantorTwo', sql.NVarChar, guarantorTwo)
      .input('guarantorOnePhone', sql.NVarChar, guarantorOnePhone)
      .input('guarantorTwoPhone', sql.NVarChar, guarantorTwoPhone)
      .execute('uspInsertStaff')
    return StaffResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateStaff(
  id,
  nameOfStaff,
  dob,
  dateEmployed,
  qualification,
  phone,
  guarantorOne,
  guarantorTwo,
  guarantorOnePhone,
  guarantorTwoPhone,
) {
  try {
    let pool = await sql.connect(db)
    let StaffResult = await pool
      .request()
      .input('id', sql.Int, id)
      .input('nameOfStaff', sql.NVarChar, nameOfStaff)
      .input('dob', sql.NVarChar, dob)
      .input('dateEmployed', sql.NVarChar, dateEmployed)
      .input('qualification', sql.NVarChar, qualification)
      .input('phone', sql.NVarChar, phone)
      .input('guarantorOne', sql.NVarChar, guarantorOne)
      .input('guarantorTwo', sql.NVarChar, guarantorTwo)
      .input('guarantorOnePhone', sql.NVarChar, guarantorOnePhone)
      .input('guarantorTwoPhone', sql.NVarChar, guarantorTwoPhone)
      .execute('uspUpdateStaff')
    return StaffResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getAllStaff() {
  try {
    let pool = await sql.connect(db)
    let staffResult = await pool.request().execute('uspGetStaff')
    return staffResult.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getStaff = async (nameOfStaff) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('nameOfStaff', sql.NVarChar, nameOfStaff)
      //.input("Password", sql.NVarChar, req)
      .execute('uspGetStaff')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

const deleteStaff = async (id) => {
  try {
    let pool = await sql.connect(db)
    let results = await pool
      .request()
      .input('id', sql.Int, id)
      //.input("Password", sql.NVarChar, req)
      .execute('uspDeleteStaff')
    return results.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  insertStaff,
  getAllStaff,
  getStaff,
  updateStaff,
  deleteStaff,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
