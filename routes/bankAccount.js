const BankAccount = require('../models/bankAccounts')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    bank: Joi.number().required(),
    branch: Joi.string().allow(''),
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    typeOfAccount: Joi.string().required(),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await BankAccount.insertBankAccount(
    req.body.bank,
    req.body.branch,
    req.body.accountNumber,
    req.body.accountName,
    req.body.typeOfAccount,
  )
  res.json(result[0])
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    bank: Joi.number().required(),
    branch: Joi.string().allow(''),
    accountNumber: Joi.string().required(),
    accountName: Joi.string().required(),
    typeOfAccount: Joi.string().required(),
    id: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await BankAccount.updateBankAccount(
    req.body.id,
    req.body.bank,
    req.body.branch,
    req.body.accountNumber,
    req.body.accountName,
    req.body.typeOfAccount,
  )
  res.json(result[0])
})

router.get('/', (request, response) => {
  BankAccount.getAllBankAccounts().then((result) => {
    response.json(result[0])
  })
})

router.get('/:bankId', (request, response) => {
  BankAccount.getABankAccount(request.params.bankId).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
