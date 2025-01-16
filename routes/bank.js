const Bank = require('../models/bank')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    bank: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Bank.insertBank(req.body.bank)
  res.json(result[0])
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    bank: Joi.string().required(),
    id: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Bank.updateBank(req.body.id, req.body.bank)
  res.json(result[0])
})

router.delete('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Bank.deleteBank(req.params.id)
  res.json(result[0])
})

router.get('/', (request, response) => {
  Bank.getAllBanks().then((result) => {
    response.json(result[0])
  })
})

router.get('/:id', (request, response) => {
  Bank.getONEBank().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
