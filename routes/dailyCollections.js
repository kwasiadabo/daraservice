const DailyCollections = require('../models/dailyCollections')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    dateOfCollection: Joi.date().required(),
    officer: Joi.number().required(),
    customer: Joi.number().required(),
    modeOfPayment: Joi.string().required(),
    amount: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await DailyCollections.insertDailyCollections(
    req.body.dateOfCollection,
    req.body.officer,
    req.body.customer,
    req.body.modeOfPayment,
    req.body.amount,
  )
  res.json(result[0])
})

router.post('/:officer/:dateOfCollection', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    officer: Joi.number().required(),
    dateOfCollection: Joi.date().required(),
  })

  const { error } = schema.validate(req.params)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await DailyCollections.creditCustomers(
    req.params.officer,
    req.params.dateOfCollection,
  )
  res.json(result[0])
})

router.post('/payment/correctdailycollection', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.number().required(),
    amount: Joi.number().required(),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await DailyCollections.correctDailyCollections(
    req.body.id,
    req.body.amount,
  )
  res.json(result[0])
})

router.get('/correction/:dateofcollection', (request, response) => {
  DailyCollections.getDailyCollectionsForCorrection(
    request.params.dateofcollection,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/expected', (request, response) => {
  DailyCollections.expectedCollections().then((result) => {
    response.json(result[0])
  })
})

router.get('/count/defaultersCount', (request, response) => {
  DailyCollections.defaulters().then((result) => {
    response.json(result[0])
  })
})

router.get('/active/activeLoans', (request, response) => {
  DailyCollections.activeLoans().then((result) => {
    response.json(result[0])
  })
})

router.get('/collectionsheet/:Officer/:collectionDate', (request, response) => {
  DailyCollections.getCollectionSheet(
    request.params.Officer,
    request.params.collectionDate,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/bal/:customer', (request, response) => {
  DailyCollections.getCustomerLoanBalance(request.params.customer).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.get('/:dateOfCollection/:officer', (request, response) => {
  DailyCollections.getTotalDailyCollections(
    request.params.dateOfCollection,
    request.params.officer,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/dayspayments/:dateOfCollection/:officer', (request, response) => {
  DailyCollections.getDailyCollections(
    request.params.dateOfCollection,
    request.params.officer,
  ).then((result) => {
    response.json(result[0])
  })
})

router.get('/:staff', (request, response) => {
  DailyCollections.getActiveLoanCustomers(request.params.staff).then(
    (result) => {
      response.json(result[0])
    },
  )
})

router.delete('/:id', (request, response) => {
  DailyCollections.deleteDailyCollections(request.params.id).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
