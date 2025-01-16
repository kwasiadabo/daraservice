const sql = require("mssql");
const db = require("../startup/db");

const getEmployees = async (directorate, department, unit, category) => {
  try {
    let pool = await sql.connect(db);
    let results = await pool
      .request()
      .input("pDirectorate", sql.NVarChar(), directorate)
      .input("pDepartment", sql.NVarChar, department)
      .input("pUnit", sql.NVarChar, unit)
      .input("pCategory", sql.NVarChar, category)
      // .query("select employeeNumber, surname from tbl_employeeDetails");
      .execute("rptStafflist");
    //console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};

const isWorking = async () => {
  return "this is working";
};

module.exports = { getEmployees, isWorking };

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
