const RegistrationFee = require('../models/registrationFee')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    customer: Joi.number().required(),
    chequeId: Joi.number().required(),
    amount: Joi.number().required(),
    modeOfPayment: Joi.string().required(),
    sending: Joi.string().allow(''),
    receiving: Joi.string().allow(''),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  try {
    const result = await RegistrationFee.insertRegistrationFee(
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
    const result = await RegistrationFee.updateRegistrationFee(
      req.body.id,
      req.body.amount,
    )
    res.json(result[0])
  } catch (err) {
    res.status(400).send(error.details[0].message)
  }
})

router.get('/', (request, response) => {
  RegistrationFee.getRegFee().then((result) => {
    response.json(result[0])
  })
})

router.get('/:customer/:chequeid', (request, response) => {
  RegistrationFee.checkRegFeeExistence(
    request.params.customer,
    request.params.chequeid,
  ).then((result) => {
    response.json(result[0])
  })
})

module.exports = router
