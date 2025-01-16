const Investment = require('../models/investment')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/item', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    item: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Investment.insertInvestmentItem(req.body.item)
  res.json(result[0])
})

router.put('/item/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    item: Joi.string().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Investment.updateInvestmentItem(
    req.params.id,
    req.body.item,
  )
  res.json(result[0])
})

router.delete('/item/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Investment.deleteInvestmentItem(req.params.id)
  res.json(result[0])
})

router.get('/item', (request, response) => {
  Investment.getAllInvestmentItems().then((result) => {
    response.json(result[0])
  })
})

module.exports = router
