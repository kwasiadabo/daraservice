const Expenses = require('../models/expenses')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    expenseItem: Joi.number().required(),
    modeOfPayment: Joi.string().required(),
    narration: Joi.string().required(),
    amount: Joi.number().required(),
    madeBy: Joi.number().required(),
    bank: Joi.number().allow(''),
    accountNumber: Joi.number().allow(''),
    sending: Joi.string().allow(''),
    receiving: Joi.string().allow(''),
    dateOnCheque: Joi.string().allow(''),
    nameOnCheque: Joi.string().allow(''),
    chequeNumber: Joi.string().allow(''),
    tdate: Joi.date().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Expenses.insertExpenses(
    req.body.expenseItem,
    req.body.modeOfPayment,
    req.body.narration,
    req.body.amount,
    req.body.madeBy,
    req.body.bank,
    req.body.accountNumber,
    req.body.sending,
    req.body.receiving,
    req.body.dateOnCheque,
    req.body.nameOnCheque,
    req.body.chequeNumber,
    req.body.tdate,
  )
  res.json(result[0])
})

router.put('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Expenses.approveExpenses(req.params.id)
  res.json(result[0])
})

router.delete('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Expenses.deleteExpenses(req.params.id)
  res.json(result[0])
})

router.get('/unapproved/:startDate/:endDate', (request, response) => {
  Expenses.getUnapprovedExpenses(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/approved/:startDate/:endDate', (request, response) => {
  Expenses.getApprovedExpenses(
    request.params.startDate,
    request.params.endDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/:startDate/:endDate', (request, response) => {
  Expenses.getExpenses(request.params.startDate, request.params.endDate).then(
    (result) => {
      response.json(result[0])
    },
  )
})

module.exports = router
