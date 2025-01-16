const BulkCash = require('../models/bulkCashReceipt')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    dateOfReceipt: Joi.date().required(),
    Officer: Joi.string().required(),
    Cash: Joi.number().required(),
    Momo: Joi.number().required(),
    TotalAmount: Joi.number().required(),
    Overage: Joi.number().default(0),
    Shortage: Joi.number().default(0),
    receivedBy: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await BulkCash.insertBulkCashReceipt(
    req.body.dateOfReceipt,
    req.body.Officer,
    req.body.Cash,
    req.body.Momo,
    req.body.TotalAmount,
    req.body.Overage,
    req.body.Shortage,
    req.body.receivedBy,
  )
  res.json(result[0])
})

router.delete('/:id/:officer/:dateOfReceipt', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.date().required(),
    officer: Joi.date().required(),
    dateOfReceipt: Joi.date().required(),
  })

  const { error } = schema.validate(req.params)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await BulkCash.deleteBulkCashCollection(
    req.params.id,
    req.params.officer,
    req.params.dateOfReceipt,
  )
  res.json(result[0])
})

router.get('/submitted/:dateOfReceipt/:officer', (request, response) => {
  BulkCash.getBulkCashSubmitted(
    request.params.dateOfReceipt,
    request.params.officer,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/:dateOfReceipt', (request, response) => {
  BulkCash.getBulkCashReceivedByDate(request.params.dateOfReceipt).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/:id', (request, response) => {
  Bank.getONEBank().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
