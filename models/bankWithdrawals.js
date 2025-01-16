const sql = require('mssql')
const db = require('../startup/db')

async function withdrawFromBank(tdate, dr, narration, bank, accountNo, userId) {
  try {
    let pool = await sql.connect(db)
    let Withdrawal = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .input('dr', sql.Money, dr)
      .input('narration', sql.NVarChar, narration)
      .input('bank', sql.Int, bank)
      .input('accountNo', sql.Int, accountNo)
      .input('userId', sql.Int, userId)
      .execute('uspWithdrawFromBank')
    return Withdrawal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function updateWithdrawFromBank(
  tdate,
  dr,
  narration,
  bank,
  accountNo,
  userId,
  id,
) {
  try {
    let pool = await sql.connect(db)
    let Withdrawal = await pool
      .request()
      .input('tdate', sql.Date, tdate)
      .input('dr', sql.Money, dr)
      .input('narration', sql.NVarChar, narration)
      .input('bank', sql.Int, bank)
      .input('accountNo', sql.Int, accountNo)
      .input('userId', sql.Int, userId)
      .input('id', sql.Int, id)

      .execute('uspUpdateWithdrawFromBank')
    return Withdrawal.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getBankWithdrawals(startDate, endDate) {
  try {
    let pool = await sql.connect(db)
    let Withdrawals = await pool
      .request()
      .input('startDate', sql.Date, startDate)
      .input('endDate', sql.Date, endDate)
      .execute('uspGetBankWithdrawals')
    return Withdrawals.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  withdrawFromBank,
  getBankWithdrawals,
  updateWithdrawFromBank,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
