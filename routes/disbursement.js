const Disbursement = require('../models/disbursement')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    chequeId: Joi.number().required(),
    disbursedBy: Joi.number().required(),
    customer: Joi.number().required(),
    amount: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Disbursement.insertDisbursement(
    req.body.chequeId,
    req.body.disbursedBy,
    req.body.customer,
    req.body.amount,
  )
  res.json(result[0])
})

router.get('/unbooked', (request, response) => {
  Disbursement.getUnbookedCheques().then((result) => {
    response.json(result[0])
  })
})

router.get('/:startdate/:enddate', (request, response) => {
  Disbursement.getAllDisbursement(
    request.params.startdate,
    request.params.enddate,
  ).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
