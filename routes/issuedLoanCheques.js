const IssuedLoanCheques = require('../models/issuedLoanCheques')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    nameOnCheque: Joi.number().required().label('Name on Cheque'),
    bank: Joi.number().required().label('Bank'),
    bankAccount: Joi.number().required().label('Bank Account'),
    dateOnCheque: Joi.string().required().label('Date On Cheque'),
    chequeNumber: Joi.string().required().label('Cheque Number'),
    amount: Joi.number().required().label('Amount on Cheque'),
    issuedBy: Joi.number().required(),
    entryDate: Joi.date().required(),
    status: Joi.string().allow(''),
    bookingStatus: Joi.string().allow(''),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await IssuedLoanCheques.insertIssuedLoanCheque(
    req.body.nameOnCheque,
    req.body.bank,
    req.body.bankAccount,
    req.body.dateOnCheque,
    req.body.chequeNumber,
    req.body.amount,
    req.body.issuedBy,
    new Date(),
    req.body.status,
    'Not Booked',
  )
  res.json(result[0])
})

router.delete('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await IssuedLoanCheques.deleteIssuedLoanCheque(req.params.id)
  res.json(result[0])
})

router.get('/checkactiveloan/:customer', (request, response) => {
  IssuedLoanCheques.checkActiveLoan(request.params.customer).then((result) => {
    response.json(result[0])
  })
})

router.get('/:startdate/:enddate', (request, response) => {
  IssuedLoanCheques.getIssuedLoanCheques(
    request.params.startdate,
    request.params.enddate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/undisbursed', (request, response) => {
  IssuedLoanCheques.getUndisburseCheques().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
