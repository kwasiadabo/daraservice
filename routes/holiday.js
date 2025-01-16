const Holiday = require('../models/holiday')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    holiday: Joi.string().required(),
    hdate: Joi.date().required().label('Date of Holiday'),
    year: Joi.number().required().label('Year of Holiday'),
  })
  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Holiday.insertHoliday(
    req.body.holiday,
    req.body.hdate,
    req.body.year,
  )
  res.json(result[0])
})

router.get('/:year', (request, response) => {
  Holiday.getYearHolidays(request.params.year).then((result) => {
    response.json(result[0])
  })
})

router.put('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const schema = Joi.object({
    id: Joi.number().required(),
    holiday: Joi.string().required(),
    hdate: Joi.string().required(),
    year: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }
  const result = await Holiday.updateHoliday(
    req.body.id,
    req.body.holiday,
    req.body.hdate,
    req.body.year,
  )
  res.json(result[0])
})

router.delete('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const result = await Holiday.deleteHoliday(req.params.id)
  res.json(result[0])
})

module.exports = router
