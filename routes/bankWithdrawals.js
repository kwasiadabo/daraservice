const BankWithdrawal = require('../models/bankWithdrawals')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    tdate: Joi.date().required(),
    dr: Joi.number().required(),
    narration: Joi.string().required(),
    bank: Joi.number().required(),
    accountNo: Joi.number().required(),
    userId: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await BankWithdrawal.withdrawFromBank(
    req.body.tdate,
    req.body.dr,
    req.body.narration,
    req.body.bank,
    req.body.accountNo,
    req.body.userId,
  )
  res.json(result[0])
})

router.put('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    tdate: Joi.date().required(),
    dr: Joi.number().required(),
    narration: Joi.string().required(),
    bank: Joi.number().required(),
    accountNo: Joi.number().required(),
    userId: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await BankWithdrawal.updateWithdrawFromBank(
    req.body.tdate,
    req.body.dr,
    req.body.narration,
    req.body.bank,
    req.body.accountNo,
    req.body.userId,
    req.params.id,
  )
  res.json(result[0])
})

router.get('/unapproved', (request, response) => {
  BankTrans.getUnApproveDeposits().then((result) => {
    response.json(result[0])
  })
})

router.get('/openingBal', (request, response) => {
  BankTrans.getOpeningBal().then((result) => {
    response.json(result[0])
  })
})

router.get('/approved/:startDate/:endDate', (request, response) => {
  BankTrans.getApproveDeposits(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/:startDate/:endDate', (request, response) => {
  BankWithdrawal.getBankWithdrawals(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.delete('/:id', (request, response) => {
  BankTrans.deleteBankDeposit(request.params.id).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
