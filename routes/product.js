const Product = require('../models/product')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    product: Joi.string().required(),
    processingFee: Joi.number().required(),
    frequency: Joi.string().required(),
    interestRate: Joi.number().required(),
    registrationFee: Joi.number().required(),
    duration: Joi.number().required(),
    cashCollateral: Joi.number().required(),
    shortName: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await Product.insertProduct(
    req.body.product,
    req.body.processingFee,
    req.body.frequency,
    req.body.interestRate,
    req.body.registrationFee,
    req.body.duration,
    req.body.cashCollateral,
    req.body.shortName,
  )
  res.json(result[0])
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    product: Joi.string().required(),
    processingFee: Joi.number().required(),
    frequency: Joi.string().required(),
    interestRate: Joi.number().required(),
    registrationFee: Joi.number().required(),
    duration: Joi.number().required(),
    cashCollateral: Joi.number().required(),
    shortName: Joi.string().allow(''),
    id: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const result = await Product.updateProduct(
    req.body.id,
    req.body.product,
    req.body.processingFee,
    req.body.frequency,
    req.body.interestRate,
    req.body.registrationFee,
    req.body.duration,
    req.body.cashCollateral,
    req.body.shortName,
  )
  res.json(result[0])
})

router.get('/', (request, response) => {
  Product.getAllProducts().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
