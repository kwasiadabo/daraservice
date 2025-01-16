const CashCollateral = require('../models/cashCollateral')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    chequeId: Joi.number().required(),
    amount: Joi.string().required(),
    modeOfPayment: Joi.string().required(),
    sending: Joi.string().allow(''),
    receiving: Joi.string().allow(''),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const result = await CashCollateral.insertCashCollateral(
      req.body.customer,
      req.body.chequeId,
      req.body.amount,
      req.body.modeOfPayment,
      req.body.sending,
      req.body.receiving,
    )

    res.json(result[0])
  } catch (err) {
    res.status(400).send(error.details[0].message)
  }
})

router.post('/withdrawal', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    amount: Joi.number().required(),
    narration: Joi.string().required(),
    entryBy: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const result = await CashCollateral.withdrawCollateralCash(
      req.body.customer,
      req.body.amount,
      req.body.narration,
      req.body.entryBy,
    )
    res.json(result[0])
  } catch (err) {
    res.status(400).send(error.details[0].message)
  }
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.number().required(),
    amount: Joi.number().required(),
    // modeOfPayment: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const result = await CashCollateral.updateCashCollateral(
      req.body.id,
      req.body.amount,
    )
    res.json(result[0])
  } catch (err) {
    res.status(400).send(error.details[0].message)
  }
})

router.get('/:customer/:chequeid', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.checkCollateralExistence(
    request.params.customer,
    request.params.chequeid,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/withbal', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.getCashCollateralHolders().then((result) => {
    response.json(result[0])
  })
})

router.get('/', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.getCashCollateral().then((result) => {
    response.json(result[0])
  })
})

router.get('/:customer', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.getCollateralBal(request.params.customer).then((result) => {
    response.json(result[0])
  })
})

router.get('/withdrawals/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.getCollateralWithdrawals(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/received/:startDate/:endDate', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.getCollateralReceived(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.post('/tranfer', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.OffSetLoanWithCollateral(
    request.body.customer,
    request.body.Dr,
    request.body.narration,
    request.body.entryBy,
  ).then((result) => {
    response.json(result[0])
  })
})

router.put('/reversal', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  CashCollateral.reverseCollateralTransfer(
    request.body.id,
    request.body.idNumber,
    request.body.dr,
    request.body.narration,
    request.body.date,
  ).then((result) => {
    response.json(result[0])
  })
})
module.exports = router
