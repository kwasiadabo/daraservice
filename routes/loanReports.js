const LoanReports = require('../models/loanReports')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.get('/arrears/:officer', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.loansInArrears(request.params.officer).then((result) => {
    response.json(result[0])
  })
})

router.get('/loansDisbursed/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.loansDisbursed(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/portfolio/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getLoansDisbursedPerOfficer(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get(
  '/officerloans/:startDate/:endDate/:officer',
  (request, response) => {
    response.header('Access-Control-Allow-Origin', '*')
    LoanReports.getOfficerLoansDisbursed(
      request.params.startDate,
      request.params.endDate,
      request.params.officer,
    ).then((result) => {
      response.json(result[0])
    })
  },
)

router.get('/issuedcheques/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.issuedCheques(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/activeloans', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.activeLoans().then((result) => {
    response.json(result[0])
  })
})
router.get('/balances', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.loanBalances().then((result) => {
    response.json(result[0])
  })
})
router.get('/collateralBalances', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.collateralBalances().then((result) => {
    response.json(result[0])
  })
})

router.get('/paymentsdue/:pDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.paymentsDue(request.params.pDate).then((result) => {
    response.json(result[0])
  })
})

router.get('/customer/:customer', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getCustomerLoans(request.params.customer).then((result) => {
    response.json(result[0])
  })
})

router.get('/dailyEntry/:officer/:dateOfCollection', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getDailyEntryReport(
    request.params.officer,
    request.params.dateOfCollection,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/endOfDaySummary/:dateOfCollection', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getEndOfDaySummary(request.params.dateOfCollection).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get(
  '/bankstatement/:startDate/:endDate/:bank/:accountNumber',
  (request, response) => {
    response.header('Access-Control-Allow-Origin', '*')
    LoanReports.getBankStatement(
      request.params.startDate,
      request.params.endDate,
      request.params.bank,
      request.params.accountNumber,
    ).then((result) => {
      response.json(result[0])
    })
  },
)

router.get('/vaultstatement/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getVaultStatement(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/expectedPayments', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getExpectedPayments().then((result) => {
    response.json(result[0])
  })
})

router.get('/loanarrears', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getLoanInArrears().then((result) => {
    response.json(result[0])
  })
})

router.get('/defaulters', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  LoanReports.getDefaulters().then((result) => {
    response.json(result[0])
  })
})
module.exports = router
