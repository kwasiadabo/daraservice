const CashAccounting = require('../models/cashAccounting')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    Cr: Joi.number().required(),
    narration: Joi.string().required(),
    tdate: Joi.date().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await CashAccounting.insertEndDay(
    req.body.Cr,
    req.body.narration,
    req.body.tdate,
  )
  res.json(result[0])
})

router.get('/loans/:dateOfReceipt', (request, response) => {
  CashAccounting.getLoanCollections(request.params.dateOfReceipt).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/collateral/:dateOfReceipt', (request, response) => {
  CashAccounting.getCashCollateralCollections(
    request.params.dateOfReceipt,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/registration/:dateOfReceipt', (request, response) => {
  CashAccounting.getRegistrationCollections(request.params.dateOfReceipt).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/expenses/:dateOfReceipt', (request, response) => {
  CashAccounting.getDaysExpenses(request.params.dateOfReceipt).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/processingFee/:tdate', (request, response) => {
  CashAccounting.getDaysProcessingFee(request.params.tdate).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
